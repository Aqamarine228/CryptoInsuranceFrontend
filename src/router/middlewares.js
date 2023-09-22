import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";

const authenticated = ({next, store}) => {
    if (!store.getters["auth/isLoggedIn"]) {
        // Redirect to the home page instead
        next({name: "login"});
        return
    } else {
        // Continue to the login page
        next();
    }
}

const unauthenticated = ({next, store}) => {
    if (store.getters["auth/isLoggedIn"]) {
        // Redirect to the home page instead
        next({name: "default"});
        return
    } else {
        // Continue to the login page
        next();
    }
}

const withUser = ({next, store}) => {
    if (store.getters["user/user"]) {
        next();
        return
    }

    axiosInstance.get(backend.user).then((response) => {
        store.commit('user/SET_CURRENT_USER', response)
        next();
    })
}

const emailVerified = ({next, store}) => {
    if (store.getters["user/isEmailVerified"]) {
        next()
        return
    }

    next({name: 'Email verification'})
}

const noReferralRequests = ({next, store}) => {
    if (!store.getters["user/hasReferralRequest"]) {
        next();
        return
    }

    next({name: 'referrals'})
}

const noInsuranceRequests = ({next, store}) => {
    if (!store.getters["user/hasInsuranceRequest"]) {
        next();
        return
    }

    next({name: 'Insurance'})
}

const defaultMiddlewares = [authenticated, withUser, emailVerified]

export {authenticated, unauthenticated, withUser, noReferralRequests, noInsuranceRequests, defaultMiddlewares}