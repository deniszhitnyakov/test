export default {
    namespaced: true,
    state: {
        proxy: {
            all: []
        },
    },
    getters: {
        proxy: state => state.proxy
    },
    mutations: {
        SET_PROXY: (state, proxy) => {
            state.proxy.all = proxy;
        }
    },
    actions: {
        async loadProxy(context) {
            const response = await this._vm.api('/proxy');
            if (typeof response.data.data !== 'undefined') {
                context.commit('SET_PROXY', response.data.data);
            }
        }
    }
};