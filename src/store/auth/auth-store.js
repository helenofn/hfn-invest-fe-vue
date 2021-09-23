const estado = {
    token: null,
    usuario: {}
}

const mutations = {
    DEFINIR_USUARIO_LOGADO (state, { token, usuario }){
        state.usuario = usuario;
        state.token = token;
    },
    DESLOGAR_USUARIO (state){
        state.token = null;
        state.usuario = {};
    }
}

const getters = {
    usuarioEstaLogado: state => Boolean(state.token)
}

export default {
    state: estado,
    mutations: mutations,
    getters: getters
};