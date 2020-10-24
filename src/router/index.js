import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Profile from '../views/Profile'

Vue.use(VueRouter);


import store from '../store/';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: Profile,
    beforeEnter(from, to, next){
      store.dispatch('fetchUserInfo', from.params.id);
      next();
    },
  },
  {
    path: '*',
    redirect: {name: 'Home'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
