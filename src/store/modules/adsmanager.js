export default {
    namespaced: true,
    state: {
        activeTab:{
            tab: 1,
            component: 'accounts'
        },
    },
    getters: {
        activeTab: state => state.activeTab
    },
    mutations: {
        SET_ACTIVE_TAB: (state, tab) => {
            state.activeTab = tab;
        }
    },
    actions: {
        async setActiveTab(context, tab) {
            context.commit('SET_ACTIVE_TAB', tab);
        }
    }
};