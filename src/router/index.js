import Vue from 'vue'
import VueRouter from 'vue-router'
import Dasboard from '../views/Dashboard.vue'
import Login from '@/views/Login'
//import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      publica: true
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dasboard,
    meta: {
      publica: false
    }
  },
  {
    path: '/movimentacao-bancaria',
    name: 'movimentacoes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/MovimentacoesBancarias.vue'),
    meta: {
      publica: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (routeTo, routeFrom, next) => {
  if(!routeTo.meta.publica /*&& !store.state.token*/){
    return next({ name: 'login'});
  }
  next();
});

export default router
