// import i18n from '../../i18n';
import {
  mixinDialogMutations,
  mixinDialogActions,
  mixinDialogGetters
} from '../../mixins/vuex_dialogs';
import {
  mixinSetLoading
} from '../../mixins/vuex_loading';

export default {
  namespaced: true,
  state: {
    cabs: {
      all: [],
      filtered: [],
      selected: [],
    },
    loading: {
      mainTable: false,
    },
    stat: [],
  },
  getters: {
    ...mixinDialogGetters,

    cabs: state => state.cabs,
    selected: state => state.cabs.selected,
    filtered: state => state.cabs.filtered,
    loading: state => state.loading,
    stat: state => state.stat
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,
    
    SET_ALL_CABS: (state, cabs) => {
      state.cabs.all = cabs;
    },

    FILTER_CABS: (state) => {
      state.cabs.filtered = state.cabs.all;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },

    SET_SELECTED_CABS: (state, cabs) => {
      state.cabs.selected = cabs;
    }
  },
  actions: {
    ...mixinDialogActions,
    
    async loadCabs({dispatch, commit, rootState}) {
      commit('SET_LOADING', {
        param: 'mainTable',
        value: true,
      });

      const data = {
        accounts_ids: rootState.accounts.accounts.filtered.map(account => account.id),
      };
      const response = await this._vm.api.post('/cabs', data).catch((e) => {
        dispatch('main/apiError', e, {
          root: true
        });
      });

      commit('SET_LOADING', {
        param: 'mainTable',
        value: false,
      });

      commit('SET_ALL_CABS', response.data.data);
      commit('FILTER_CABS');
      dispatch('loadStat');
    },

    async loadStat({
      dispatch,
      commit,
      rootState
    }) {
      commit('SET_LOADING', {
        param: 'mainTable',
        value: true,
      });

      const data = {
        ids: rootState.cabs.cabs.filtered.map(cab => cab.id),
      };
      const response = await this._vm.api.post('/stat/by_cab', data).catch((e) => {
        dispatch('main/apiError', e, {
          root: true
        });
      });

      commit('SET_LOADING', {
        param: 'mainTable',
        value: false,
      });

      commit('SET_STAT', response.data.data);
    },

    async saveSelectedCabs(context, cabs) {
      context.commit('SET_SELECTED_CABS', cabs);
    }
  },
};