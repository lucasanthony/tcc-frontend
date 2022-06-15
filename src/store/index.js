import { createStore } from "vuex";
import actions from './modules/actions'

const store = createStore({
  state: {
    sidebar: {
      show: true,
      activeOption: ''
    },
    header: {
      title: '',
      modal: ''
    },
    title: "Vuex Store",
    members: []
  },
  getters: {
    allMembers(state) {
      return state.members;
    }
  },
  mutations: {
    SHOW_SIDEBAR(state, showSidebar) {
      state.sidebar.show = showSidebar
    },
    SET_SIDEBAR_OPTION(state, option) {
      state.sidebar.activeOption = option
    },
    SET_MODAL(state, option) {
      state.header.modal = option
    }
  },
  actions: {
    ...actions
  }
});

export default store;