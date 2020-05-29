import {
    mixinDialogMutations,
    mixinDialogActions,
    mixinDialogGetters
} from '../../mixins/vuex_dialogs';
import {
    mixinSetLoading
} from '../../mixins/vuex_loading';

// import i18n from '../../i18n';

export default {
    namespaced: true,
    state: {
        users: {
            all: [],
            selected: localStorage.getItem('adsmanager-users-selected')
                ? JSON.parse(localStorage.getItem('adsmanager-users-selected') || '')
                : [],
            filtered: [],
        },
        loading: {
            mainTable: false,
        },
        stat: [],
    },
    getters: {
        ...mixinDialogGetters,

        allUsers: state  => state.users.all,
        users: (state) => state.users,
        selected: (state) => state.users.selected,
        loading: (state) => state.loading,
        stat: (state) => state.stat,
    },
    mutations: {
        ...mixinDialogMutations,
        ...mixinSetLoading,

        SET_ALL_USERS: (state, users) => {
            state.users.all = users;
        },

        FILTER: (state) => {
            state.users.filtered = state.users.all;
        },

        SET_STAT: (state, stat) => {
            state.stat = stat;
        },

        SET_SELECTED: (state, data) => {
            state.users.selected = data;
            localStorage.setItem('adsmanager-users-selected', JSON.stringify(data));
        },
    },
    actions: {
        ...mixinDialogActions,

        async loadUsers({context}) {
            const response = await this._vm.api('/users');
            if (response.data.success) {
                context.commit('SET_ALL_USERS', response.data.data);
                context.commit('FILTER', null);
                context.dispatch('loadStat');
            }
        },

        async loadStat({commit, dispatch, rootState}) {
            commit('SET_LOADING', {
                param: 'mainTable',
                value: true,
            });

            const data = {
                ids: rootState.users.users.filtered.map((user) => user.id),
                dates: rootState.adsmanager.filters.dates,
            };
            const response = await this._vm.api
                .post('/stat/by_user', data)
                .catch((e) => {
                    dispatch('main/apiError', e, {
                        root: true,
                    });
                });

            commit('SET_LOADING', {
                param: 'mainTable',
                value: false,
            });

            commit('SET_STAT', response.data.data);
        },

        async saveSelected(context, data) {
            context.commit('SET_SELECTED', data);
        },

        async clearSelected({commit}) {
            commit('SET_SELECTED', []);
        },
    },
};