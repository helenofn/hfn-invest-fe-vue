import http from '@/http';
import router from '@/router';

const estado = {
    token: null,
    usuario: {}
}

const mutations = {
    DEFINIR_USUARIO_LOGADO (state, { token, usuario }){
        state.usuario = usuario;
        state.token = token;
        //localStorage.setItem('token', token);
    },
    DESLOGAR_USUARIO (state){
        state.token = null;
        state.usuario = {};
        //localStorage.setItem('token', '');
    }
}

const actions = {
    efetuarLogin({ commit }, usuario){
        return new Promise((resolve, reject) => {
            http.post('auth/logIn', usuario)
                .then(response => {
                    commit('DEFINIR_USUARIO_LOGADO', {
                        token: response.data.token,
                        usuario: response.data.user
                    });
                    resolve(response.data);
                })
                .catch(err =>{
                    reject(err);
                });
        });
    },
    efetuarLogout({ commit }){
        return new Promise((resolve) => {
            commit('DESLOGAR_USUARIO');
            router.push({name:'login'});
            resolve();
        });
    }
}

const getters = {
    usuarioEstaLogado: state => Boolean(state.token),
    token: state => state.token,
    usuario: state => state.usuario
}

export default {
    state: estado,
    mutations: mutations,
    getters: getters,
    actions: actions
};