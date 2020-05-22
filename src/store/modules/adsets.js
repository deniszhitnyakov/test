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
    adsets: {
      all: [],
      selected: [],
      filtered: [],
    },
    loading: {
      mainTable: false,
    },
    stat: []
  },
  getters: {
    ...mixinDialogGetters,

    adsets: state => state.adsets,
    selected: state => state.adsets.selected,
    loading: state => state.loading,
    stat: state => state.stat,
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,

    SET_ALL: (state, adsets) => {
      state.adsets.all = adsets;
    },

    FILTER: state => {
      state.adsets.filtered = state.adsets.all;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },
  },
  actions: {
    ...mixinDialogActions,

    async loadAdsets(context) {
      const response = await this._vm.api('/adsets');
      if (response.data.success) {
        context.commit('SET_ALL', response.data.data);
        context.commit('FILTER');
        context.dispatch('loadStat');
      }
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
        ids: rootState.adsets.adsets.filtered.map(adset => adset.id),
        dates: rootState.adsmanager.filters.dates,
      };
      const response = await this._vm.api.post('/stat/by_adset', data).catch((e) => {
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
  }
};