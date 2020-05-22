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
    ads: {
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

    ads: state => state.ads,
    selected: state => state.ads.selected,
    loading: state => state.loading,
    stat: state => state.stat,
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,

    SET_ALL: (state, ads) => {
      state.ads.all = ads;
    },

    FILTER: state => {
      state.ads.filtered = state.ads.all;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },
  },
  actions: {
    ...mixinDialogActions,

    async loadAds(context) {
      const response = await this._vm.api('/ads');
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
        ids: rootState.ads.ads.filtered.map(ad => ad.id),
        dates: rootState.adsmanager.filters.dates,
      };
      const response = await this._vm.api.post('/stat/by_ad', data).catch((e) => {
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