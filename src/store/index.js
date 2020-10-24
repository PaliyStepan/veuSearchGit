import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    users: [],
    user: {},
    text: '',
    loading: false,
    repos: [],
    hasError: false
  },
  getters:{
    text(state){
      return state.text
    },
    textLength(state){
      return state.text.length
    },
    users(state){
      return state.users
    },
    user(state){
      return state.user
    },
    usersLength(state) {
      return state.users.length
    },
    loading(state){
      return state.loading
    },
    repos(state) {
      return state.repos
    },
    hasError(state) {
      return state.hasError
    },

  },
  mutations: {
    setText(state, payload) {
      state.text = payload
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setRepos(state, payload) {
      state.repos = payload;
    },
    loadingToggle(state){
      state.loading = !state.loading;
    },
    toggleError(state, payload){
      state.hasError = payload;
    },
    setTotalPages(state, payload) {
      state.totalPages = payload
    }
  },
  actions: {
    fetchUsers(store){
      store.commit('loadingToggle');

      axios.get(`https://api.github.com/search/users?q=${this.state.text}`)
          .then(response=>{
            if (response.data.total_count !== 0){
              store.commit('setUsers', response.data.items);
              if (this.state.hasError) {
                store.commit('toggleError', false)
              }
            } else {
              store.commit('toggleError', true);
            }
            store.commit('loadingToggle');
          })
    },



    fetchUserInfo(store,name) {
      store.commit('loadingToggle');

      function getUser() {
        axios.get(`https://api.github.com/users/${name}`)
            .then(response=>{
              store.commit('setUser', response.data);
              console.log(response.data)
            })
      }
      function getRepos() {
        axios.get(`https://api.github.com/users/${name}/repos?`)
            .then(response=>{
              store.commit('setRepos', response.data);
              console.log(response.data)
            })
      }

      axios.all([getUser(), getRepos()])
          .then(axios.spread(function (acct, perms) {
            store.commit('loadingToggle');
          }));

    }


  },
  modules: {
  }
})
