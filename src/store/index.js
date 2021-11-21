import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth/auth-store';
import menu from './menu/menu-store';
import loading from './loading/loading-store';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules:{
        auth,
        menu,
        loading
    },
    plugins: [
        createPersistedState({//sem isso, o statdo fica apenas em memoria e a cada refrash de página é perdido
            storage: window.sessionStorage
       })
    ]
});

export default store;

export { store };