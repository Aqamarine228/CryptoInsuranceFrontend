export const state = {
    currentLocale: sessionStorage.getItem('locale.current') || `${window.navigator.language[0]}${window.navigator.language[1]}`
}

export const mutations = {
    SET_LOCALE(state, locale) {
        saveState('locale.current', locale)
    }
}

export const getters = {
    // Whether the user is currently logged in.
    currentLocale(state) {
        return state.currentLocale
    },
}

export const actions = {}

function saveState(key, state) {
    sessionStorage.setItem(key, state)
}