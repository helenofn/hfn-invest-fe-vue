import Vue from 'vue'
import VueRouter from 'vue-router'
import Dasboard from '@/views/Dashboard.vue'
import ErroPage from '@/views/erros/ErroPage.vue'
import Login from '@/views/Login'
import { store } from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    component: Login,
    meta: {
      publica: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      publica: true
    }
  },
  {
    path: '/error',
    name: 'error',
    component: ErroPage,
    meta: {
      publica: true
    },
    props: {
      pTipo: ''
    }
  },
  {
    path: '/cadastro-usuario',
    name: 'cadastroUsuario',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/cadastro/CadastroUsuario.vue'),
    meta: {
      publica: false,
      roles: ['ADM']
    }
  },
  {
    path: '/cadastro-corretora',
    name: 'cadastroCorretora',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/cadastro/CadastroCorretora.vue'),
    meta: {
      publica: false,
      roles: ['ADM']
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dasboard,
    meta: {
      publica: false,
      roles: ['COMMON']
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
      publica: false,
      roles: ['COMMON']
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (routeTo, routeFrom, next) => {
  if(!routeTo.meta.publica){

    if(!store.getters.usuarioEstaLogado){
      return next({ name: 'login'});
    }else{
      let userRoles = store.getters.usuario.roles;
      if(routeTo.meta && routeTo.meta.roles){
        let usuarioHasHole = false;
        routeTo.meta.roles.forEach(rotaRole => {
          if(userRoles){
            userRoles.forEach(objUserRole => {
              if(objUserRole.name == rotaRole){
                usuarioHasHole = true;
                next();
                return;
              }
            });
          }
        });
        if(!usuarioHasHole){
          return next({ 
            name: 'error', 
            params: {
              pTipo: 'NAO_AUTORIZADO'
            } 
          });
        }
      }
    }
  }
  next();
});

export default router
