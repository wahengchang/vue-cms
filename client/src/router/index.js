import { createRouter, createWebHistory } from 'vue-router'
import CmsLayout from '../layouts/CmsLayout.vue'
import FormLayout from '../layouts/FormLayout.vue'
import axios from 'axios'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {auth: 'public'},
    component:  () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {auth: 'public'},
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {auth: 'requiredLogout', layout: FormLayout},
    component: () => import('../views/SignupView.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {auth: 'requiredLogout', layout: FormLayout},
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {auth: 'requiredLogin',layout: CmsLayout},
    component: () => import('../views/LogoutView.vue')
  },
  {
    path: '/me',
    name: 'me',
    meta: {auth: 'requiredLogin', layout: CmsLayout},
    component: () => import('../views/MeView.vue')
  },
  {
    path: '/todos/create',
    name: 'todoCreate',
    meta: {auth: 'requiredLogin', layout: CmsLayout},
    component: () => import('../views/Todos/CreateView.vue')
  },
  {
    path: '/todos/:id',
    name: 'todoDetail',
    meta: {auth: 'requiredLogin', layout: CmsLayout},
    component: () => import('../views/Todos/DetailView.vue')
  },
  {
    path: '/todos',
    name: 'todoList',
    meta: {auth: 'requiredLogin', layout: CmsLayout},
    component: () => import('../views/Todos/ListView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  let  isAuthenticated = false
  try {
    const res = await axios.get('/apis/me')
    isAuthenticated = true
    store.commit('setCurrentUser', res.data.user)
  }
  catch(e){
    console.log(e)
    store.commit('setLogoutUser')
  }

  if (to.meta.auth === 'requiredLogin' && !isAuthenticated) {
    next('/login');
  } else if (to.meta.auth === 'requiredLogout' && isAuthenticated) {
    next('/me');
  } else {
    next();
  }
});

export default router
