export default {
    namespaced: true,
    state: {
        modal: false
    },
    getters: {
        modal: state => state.modal
    },
    mutations: {
        TOGGLE_MODAL: state => {
            state.modal = !state.modal;
        }
    },
    actions: {
        toggleModal({commit}) {
            commit('TOGGLE_MODAL');
        }
    }
};