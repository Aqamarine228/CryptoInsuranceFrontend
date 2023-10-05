export const state = {
    currentUser: undefined,
}
export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
    },
    REFERRAL_REQUEST_CREATED(state) {
        state.currentUser.has_referral_request = true
    },
    INSURANCE_REQUEST_CREATED(state) {
        state.currentUser.has_insurance_request = true
    },
    NOTIFICATIONS_READ(state) {
        state.currentUser.unread_notifications_count = 0
    }
}

export const getters = {
    user(state) {
        return state.currentUser
    },
    isEmailVerified(state) {
        return state.currentUser?.email_verified
    },
    isReferral(state) {
        return !!state.currentUser?.referral_id
    },
    referralId(state) {
        return state.currentUser?.referral_id
    },
    hasReferralRequest(state) {
        return state.currentUser?.has_referral_request
    },
    hasInsurance(state) {
        return state.currentUser?.has_insurance
    },
    hasInsuranceRequest(state) {
        return state.currentUser?.has_insurance_request
    }
}
