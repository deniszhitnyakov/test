import proxyTypes from '../../constants/proxy/proxy_types';

export default {
    namespaced: true,
    state: {
        proxy: {
            all: [],
            typed: [],
            name: '',
            id: '',
            modal: false
        },
    },
    getters: {
        proxy: state => state.proxy,

        modal: state => state.proxy.modal
    },
    mutations: {
        SET_PROXY: (state, proxy) => {
            state.proxy.all = proxy;
        },
        UPPERCASE_PROXY_TYPE: state => {
            state.proxy.all.forEach(item => {
                proxyTypes.forEach(type => {
                    item.type === type.value ? item.type = type.text : '';
                });
            });
        },
        GET_PROXY_NAME: (state, payload) => {
            state.proxy.name = payload.name;
            state.proxy.id = payload.id;
        },

        TOGGLE_MODAL: state => {
            state.proxy.modal = !state.proxy.modal;
        }
    },
    actions: {
        async loadProxy({commit}) {
            const response = await this._vm.api('/proxy');
            if (typeof response.data.data !== 'undefined') {
                commit('SET_PROXY', response.data.data);
                commit('UPPERCASE_PROXY_TYPE');
            }
        },

        getProxyName(context, name) {
            context.commit('GET_PROXY_NAME', name);
        },

        async saveNewName(context, payload) {
            const data = {...payload};
            console.log(payload);
            const response = await this._vm.api.post('/proxy/update_name', data);
            if (response.data.success) {
                context.dispatch('loadProxy');
                context.dispatch('toggleModal');
            } else {
                context.dispatch('main/apiError', 'save proxy name request error', {
                    root: true
                });
            }
        },

        toggleModal({commit}) {
            commit('TOGGLE_MODAL');
        }
    }
};