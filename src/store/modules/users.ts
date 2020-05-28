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

        allUsers: (state: { users: { all: object } }) => state.users.all,
        users: (state: { users: object }) => state.users,
        selected: (state: { users: { selected: object } }) => state.users.selected,
        loading: (state: { loading: boolean }) => state.loading,
        stat: (state: { stat: object }) => state.stat,
    },
    mutations: {
        ...mixinDialogMutations,
        ...mixinSetLoading,

        SET_ALL_USERS: (state: { users: { all: any } }, users: any) => {
            state.users.all = users;
        },

        FILTER: (state: { users: { filtered: any; all: any } }) => {
            state.users.filtered = state.users.all;
        },

        SET_STAT: (state: { stat: any }, stat: any) => {
            state.stat = stat;
        },

        SET_SELECTED: (state: { users: { selected: any } }, data: any) => {
            state.users.selected = data;
            localStorage.setItem('adsmanager-users-selected', JSON.stringify(data));
        },
    },
    actions: {
        ...mixinDialogActions,

        async loadUsers(context: {
            commit: (mutation: string, data: object | null) => void;
            dispatch: (action: string) => void;
        }) {
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
                ids: rootState.users.users.filtered.map((user: { id: any }) => user.id),
                dates: rootState.adsmanager.filters.dates,
            };
            const response = await this._vm.api
                .post('/stat/by_user', data)
                .catch((e: any) => {
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

        async saveSelected(
            context: { commit: (arg0: string, arg1: any) => void },
            data: any
        ) {
            context.commit('SET_SELECTED', data);
        },

        async clearSelected(
            {commit} : {commit: (mutation: string, data: object) => void}
        ) {
            commit('SET_SELECTED', []);
        },
    },
};