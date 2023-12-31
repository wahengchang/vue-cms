import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    currentUser: null,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },

    setLogoutUser(state) {
      state.currentUser = null;
    }
  },
  getters: {
    currentUser: state => state.currentUser,
  }
})

export default store