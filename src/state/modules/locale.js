export const state = {
    currentLocale: 'en'
}

export const mutations = {
    SET_LOCALE(state, locale) {
        state.currentLocale = locale
    }
}

export const getters = {
    // Whether the user is currently logged in.
    currentLocale(state) {
        return state.currentLocale
    }
}

export const actions = {}