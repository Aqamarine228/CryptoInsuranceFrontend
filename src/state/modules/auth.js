export const state = {
    currentUser: undefined,
    token: sessionStorage.getItem('auth.token'),
}

export const mutations = {
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue
    },
    SET_TOKEN(state, newValue) {
        state.token = newValue
        saveState('auth.token', newValue)
    },
    LOGOUT() {
        sessionStorage.removeItem('auth.token')
    }
}

export const getters = {
    isLoggedIn(state) {
        return !!state.token
    },
    token(state) {
        return state.token
    },
    user(state) {
        return state.currentUser
    }
}

export const actions = {
}

// ===
// Private helpers
// ===

function saveState(key, state) {
    sessionStorage.setItem(key, state)
}
