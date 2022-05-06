import { createStore } from "vuex";

const store = createStore({
    state:{
        title: "Vuex Store",
        members: []
    },
    getters:{
        allMembers(state) {
            return state.members;
        }
    },
    mutations:{
        SAVE_MEMBER(state,member) {
            state.members.push(member);
        }
    },
    actions:{
        saveMember({commit}, member) {
            commit('SAVE_MEMBER', member);
        }
    }
});

export default store;