import http from '@/http';

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
    }
}

const getters = {
    usuarioEstaLogado: state => Boolean(state.token)
}

export default {
    state: estado,
    mutations: mutations,
    getters: getters,
    actions: actions
};