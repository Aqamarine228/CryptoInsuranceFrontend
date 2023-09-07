import axiosInstance from "@/plugins/axios";
import backend from "@/config/backend";

const authenticated = ({next, store}) => {
    if (!store.getters["auth/isLoggedIn"]) {
        // Redirect to the home page instead
        next({name: "login"});
    } else {
        // Continue to the login page
        next();
    }
}

const unauthenticated = ({next, store}) => {
    if (store.getters["auth/isLoggedIn"]) {
        // Redirect to the home page instead
        next({name: "default"});
    } else {
        // Continue to the login page
        next();
    }
}

const withUser = ({next, store}) => {
    if (store.getters["auth/user"]) {
        next();
    }

    axiosInstance.get(backend.user).then((response) => {
        store.commit('auth/SET_CURRENT_USER', response)
        next();
    })
}

const emailVerified = ({next, store}) => {
    if (store.getters["auth/user"].email_verified) {
        next()
    }

    next({name: 'Email verification'})
}

const defaultMiddlewares = [authenticated, withUser, emailVerified]

export {authenticated, unauthenticated, withUser, defaultMiddlewares}