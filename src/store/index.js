import { createStore } from "vuex";
import axios from 'axios'
import actions from './modules/actions'

const Api = axios.create({
    baseURL: 'http://localhost:4444/',
    headers: {
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("auth_token")
    },
    withCredentials: true
});


const store = createStore({
    state: {
        title: "Vuex Store",
        members: []
    },
    getters: {
        allMembers(state) {
            return state.members;
        }
    },
    mutations: {
        SAVE_MEMBER(state, member) {
            state.members.push(member);
        }
    },
    actions: {
        ...actions,
        saveMember({ commit }, member) {
            console.log('deu bom')
            commit('SAVE_MEMBER', member);
        }
    }
});

export default store;