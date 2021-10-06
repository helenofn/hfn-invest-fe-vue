import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth/auth-store';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules:{
        auth
    }
});

/*export default{
    
}*/