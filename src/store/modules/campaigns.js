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
    campaigns: {
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

    campaigns: state => state.campaigns,
    selected: state => state.campaigns.selected,
    loading: state => state.loading,
    stat: state => state.stat,
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,

    SET_ALL: (state, campaigns) => {
      state.campaigns.all = campaigns;
    },

    FILTER: state => {
      state.campaigns.filtered = state.campaigns.all;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },
  },
  actions: {
    ...mixinDialogActions,

    async loadCampaigns(context) {
      const response = await this._vm.api('/campaigns');
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
        ids: rootState.campaigns.campaigns.filtered.map(campaign => campaign.id),
        dates: rootState.adsmanager.filters.dates,
      };
      const response = await this._vm.api.post('/stat/by_campaign', data).catch((e) => {
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