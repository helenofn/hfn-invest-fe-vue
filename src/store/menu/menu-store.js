const estado = {
    isOpen: false
}

const mutations = {
    DEFINIR_ABERTURA_MENU(state, { isOpen }){
        state.isOpen = isOpen;
    }
}

const actions = {
    menuToogle({ commit, state }, isOpen){
        let v_isOpen = isOpen;
        if(isOpen==null || isOpen==undefined || isOpen == ''){
            v_isOpen = !state.isOpen;
        }
        commit('DEFINIR_ABERTURA_MENU', {
            isOpen: v_isOpen
        });
    }
}

const getters = {
    getMenuIsOpen: state => state.isOpen
}

export default {
    state: estado,
    mutations: mutations,
    getters: getters,
    actions: actions
};