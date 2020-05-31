export default {
    namespaced: true,
    state: {
        proxy: {
            all: [],
        },
        proxyModifiers: {
            id: '',
            name: '' 
        }
    },
    getters: {
        proxy: state => state.proxy,
        proxyModifiers: state => state.proxyModifiers
    },
    mutations: {
        SET_PROXY: (state, proxy) => {
            state.proxy.all = proxy;
        },
        GET_PROXY_NAME: (state, payload) => {
            state.proxyModifiers.name = payload.name;
            state.proxyModifiers.id = payload.id;
        }
    },
    actions: {
        async loadProxy({commit}) {
            const response = await this._vm.api('/proxy');
            if (typeof response.data.data !== 'undefined') {
                commit('SET_PROXY', response.data.data);
            }
        },
        getProxyName(context, name) {
            context.commit('GET_PROXY_NAME', name);
        },
        async saveNewName(context, payload) {
            const data = {...payload};
            const response = await this._vm.api.post('/proxy/update_name', data);
            if (response.data.success) {
                context.dispatch('loadProxy');
                context.dispatch('modal/toggleModal', '', {
                    root: true
                });
            } else {
                context.dispatch('main/apiError', 'save proxy name request error', {
                    root: true
                });
            }
        }
    }
};