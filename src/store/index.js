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
    sidebar: {
      show: true,
      activeOption: ''
    },
    header: {
      title: ''
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
    }
  },
  actions: {
    ...actions
  }
});

export default store;