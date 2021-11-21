const estado = {
    qtdRequestSend: 0
}

const mutations = {
    ADD_REQUEST_SEND(state){
        state.qtdRequestSend = state.qtdRequestSend + 1;
        state.qtdRequestSend<0?state.qtdRequestSend=0:null;
    },
    REMOVE_REQUESt_SEND(state){
        state.qtdRequestSend = state.qtdRequestSend - 1;
        state.qtdRequestSend<0?state.qtdRequestSend=0:null;
    }
}

const actions = {
    addRequestSend({ commit }){
        commit('ADD_REQUEST_SEND');
    },
    removeRequestSend({ commit }){
        commit('REMOVE_REQUESt_SEND');
    }
}

const getters = {
    isLoading: state => state.qtdRequestSend > 0
}

export default {
    state: estado,
    mutations: mutations,
    getters: getters,
    actions: actions
};