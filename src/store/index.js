import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth/auth-store';
import menu from './menu/menu-store';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        auth,
        menu
    }
});

/*export default{
    
}*/