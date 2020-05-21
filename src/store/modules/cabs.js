import i18n from '../../i18n';
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
  root: true,
  state: {
    cabs: {
      all: [],
      filtered: [],
      selected: [],
    },
    loading: {
      mainTable: false,
      tags: false,
      share: false,
    },
    stat: [],
    dialogs: {
      filters: false,
      attachCard: false,
      tags: false,
      share: false,
      changeCountry: false,
      rename: false,
      createPixel: false,
      unarchive: false,
    },
    emptyFilters: {
      name: '',
      accountsStatuses: [],
      cabsStatuses: [],
      type: 'all',
      attachedCard: 'all',
      bms: [],
      tags: [],
      showArchived: false,
    },
    filters: {}
  },
  getters: {
    ...mixinDialogGetters,

    cabs: state => state.cabs,
    selected: state => state.cabs.selected,
    filtered: state => state.cabs.filtered,
    loading: state => state.loading,
    stat: state => state.stat,
    filters: state => state.filters,
  },
  mutations: {
    ...mixinDialogMutations,
    ...mixinSetLoading,
    
    SET_ALL_CABS: (state, cabs) => {
      state.cabs.all = cabs;
    },

    FILTER_CABS(state) {
      let cabs = state.cabs.all;

      if (
        typeof state.filters.accountsStatuses !== 'undefined' &&
        state.filters.accountsStatuses && 
        state.filters.accountsStatuses.length > 0
      ) {
        cabs = cabs.filter(cab => {
          return state.filters.accountsStatuses.indexOf(cab.account.status.toString()) > -1;
        });
      }

      if (
        typeof state.filters.cabsStatuses !== 'undefined' &&
        state.filters.cabsStatuses && 
        state.filters.cabsStatuses.length > 0
      ) {
        cabs = cabs.filter(cab => {
          return state.filters.cabsStatuses.find(status => {
            return status.value === cab.status;
          });
        });
      }

      if (
        typeof state.filters.tags !== 'undefined' &&
        state.filters.tags && 
        state.filters.tags.length > 0
      ) {
        cabs = cabs.filter(cab => {
          return state.filters.tags.some(tags => {
            if (!Array.isArray(cab.tags)) return false;
            return cab.tags.indexOf(tags) > -1;
          });
        });
      }

      if (
        typeof state.filters.type !== 'undefined' &&
        state.filters.type !== 'all'
      ) {
        cabs = cabs.filter(cab => {
          if (state.filters.type === 'personal') {
            return !cab.business_id; 
          } else if (state.filters.type === 'business') {
            return cab.business_id;
          }
        });
      }

      if (
        typeof state.filters.attachedCard !== 'undefined' &&
        state.filters.attachedCard !== 'all'
      ) {
        cabs = cabs.filter(cab => {
          if (state.filters.attachedCard === 'with-card') {
            return cab.card_number;
          } else if (state.filters.attachedCard === 'without-card') {
            return !cab.card_number;
          }
        });
      }

      if (
        typeof state.filters.name !== 'undefined' && 
        state.filters.name && 
        state.filters.name.toString().length > 0
      ) {
        cabs = cabs.filter(cab => {
          if (cab.name) {
            return cab.name.toString().toLowerCase().search(state.filters.name.toString().toLowerCase()) > -1;
          }
          return false;
        });
      }

      if (
        typeof state.filters.bms !== 'undefined' &&
        state.filters.bms && 
        Array.isArray(state.filters.bms) && 
        state.filters.bms.length > 0
      ) {
        cabs = cabs.filter(cab => {
          if (cab.business_id) {
            return state.filters.bms.some(bm => {
              return bm.id === cab.business_id;
            });
          }
          return false;
        });
      }

      if(
        typeof state.filters.showArchived === 'undefined' ||
        !state.filters.showArchived
      ) {
        cabs = cabs.filter(cab => cab.archived === 0);
      }

      state.cabs.filtered = cabs;
    },

    SET_STAT: (state, stat) => {
      state.stat = stat;
    },

    SET_SELECTED_CABS: (state, cabs) => {
      state.cabs.selected = cabs;
    },

    SET_SPECIFIC_FILTER: (state, data) => {
      state.filters[data.filter] = data.data;
      localStorage.setItem('adsmanager-cabs-filters', JSON.stringify(state.filters));
    },

    LOAD_FILTERS: (state) => {
      if (localStorage.getItem('adsmanager-cabs-filters')) {
        state.filters = JSON.parse(localStorage.getItem('adsmanager-cabs-filters'));
      } else {
        state.filters = {...state.emptyFilters};
      }
    },

    CLEAR_FILTERS: state => {
      state.filters = {
        ...state.emptyFilters
      };
      localStorage.removeItem('adsmanager-cabs-filters');
    },

    REFRESH_SELECTED: state => {
      state.cabs.selected = state.cabs.selected.map(cab => {
        return state.cabs.all.find(c => c.id === cab.id);
      });
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
      commit('REFRESH_SELECTED');
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
        dates: rootState.adsmanager.filters.dates,
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
    },

    async clearSelected(context) {
      context.commit('SET_SELECTED_CABS', []);
    },

    async setSpecificFilter(context, data) {
      context.commit('SET_SPECIFIC_FILTER', data);
      context.commit('FILTER_CABS');
    },

    async filterCabs(context) {
      context.commit('FILTER_CABS');
    },

    async loadFilters(context) {
      context.commit('LOAD_FILTERS');
    },

    async clearFilters(context) {
      context.commit('CLEAR_FILTERS');
    },

    async saveMultipleTags(context, data) {
      context.commit('SET_LOADING', {
        param: 'tags',
        value: true
      });

      const response = await this._vm.api.post('/cabs/update_multiple_tags', data).catch((e) => {
        context.dispatch('main/apiError', e, {
          root: true
        });
      });

      context.commit('SET_LOADING', {
        param: 'tags',
        value: false
      });

      if (response.data.success) {
        context.dispatch('main/alert', {
          color: 'success',
          message: i18n.t('common.saved')
        }, {
          root: true
        });

        context.dispatch('loadCabs');
        return true;
      } else {
        context.dispatch('main/apiError', response.data, {
          root: true
        });
      }

      return response.data.success;
    },

    async savePermissions(context, data) {
      context.commit('SET_LOADING', {
        param: 'share',
        value: true
      });

      const response = await this._vm.api.post('/cabs/update_multiple_permissions', data).catch((e) => {
        context.dispatch('main/apiError', e, {
          root: true
        });
      });

      context.commit('SET_LOADING', {
        param: 'share',
        value: false
      });

      if (response.data.success) {
        context.dispatch('main/alert', {
          color: 'success',
          message: i18n.t('common.saved')
        }, {
          root: true
        });

        context.dispatch('loadCabs');
      } else {
        context.dispatch('main/apiError', response.data, {
          root: true
        });
      }

      return response.data.success;
    },

    async archive(context, data) {
      context.commit('SET_LOADING', {
        param: 'mainTable',
        value: true
      });

      const response = await this._vm.api.post('/cabs/archive', data).catch((e) => {
        context.dispatch('main/apiError', e, {
          root: true
        });
      });

      context.commit('SET_LOADING', {
        param: 'mainTable',
        value: false
      });

      if (response.data.success) {
        context.dispatch('main/alert', {
          color: 'success',
          message: i18n.t('common.saved')
        }, {
          root: true
        });

        context.dispatch('loadCabs');
      } else {
        context.dispatch('main/apiError', response.data, {
          root: true
        });
      }

      return response.data.success;
    },
  },
};