import {
    SET_LOADER,
    SET_LOADER_WITH_TEXT,
    RESET_LOADER
} from '../mutation-types'

const state = {
    status: false,
    text: ''
}

const mutations = {
    [SET_LOADER]() {
        state.status = true
    },

    [SET_LOADER_WITH_TEXT](payload) {
        state.status = payload.status
        state.text = payload.text
    },

    [RESET_LOADER]() {
        state.status = false
        state.text = ''
    }
}

const actions = {
    setLoader({ commit }) {
        commit(SET_LOADER)
    },
    setLoaderWithText({ commit }, loader) {
        commit(SET_LOADER_WITH_TEXT, loader)
    },
    resetLoader({ commit }) {
        commit(RESET_LOADER)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
