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
    dates: {
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

    dates: state => state.dates,
    selected: state => state.dates.selected,
    loading: state => state.loading,
    stat: state => state.stat,
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,

    SET_ALL_DATES: (state, users) => {
      state.dates.all = users;
    },

    FILTER: state => {
      state.dates.filtered = state.dates.all;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },
  },
  actions: {
    ...mixinDialogActions,

    async loadDates({
      dispatch,
      commit,
      rootState
    }) {
      const data = {
        dates: rootState.adsmanager.filters.dates
      };
      const response = await this._vm.api.post('/dates', data);
      if (response.data.success) {
        commit('SET_ALL_DATES', response.data.data);
        commit('FILTER');
        dispatch('loadStat');
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
        dates: rootState.dates.dates.all.map(date => date.date),
      };
      
      const response = await this._vm.api.post('/stat/by_date', data).catch((e) => {
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