import {mixinDialogMutations, mixinDialogActions, mixinDialogGetters} from '../../mixins/vuex_dialogs';

export default {
  namespaced: true,
  root: true,
  state: {
    accounts: {
      all: [],
      selected: [],
      filtered: [],
      forAssigningTags: {},
      forShare: {},
    },
    filters: {
      name: ''
    },
    dialogs: {
      assignTags: false,
      add: false,
      edit: false,
      share: false,
    },
    loading: {
      mainTable: false,
      addDialog: false,
    },
  },
  getters: {
    ...mixinDialogGetters,
    ACCOUNTS: state => state.accounts,
    FILTERS: state => state.filters,
    accountForAssigningTags: state => state.accounts.forAssigningTags,
    forShare: state => state.accounts.forShare,
    loading: state => state.loading,
  },
  mutations: {
    ...mixinDialogMutations,

    SET_LOADING: (state, data) => {
      state.loading[data.param] = data.value;
    },
    SET_ALL_ACCOUNTS: (state, payload) => {
      state.accounts.all = payload;
    },
    SET_FILTERED_ACCOUNTS: (state, payload) => {
      state.accounts.filtered = payload;
    },
    SET_SELECTED_ACCOUNTS: (state, payload) => {
      state.accounts.selected = payload;
    },
    DELETE_ACCOUNTS: (state, payload) => {
      state.accounts.all = state.accounts.all.filter(account => {
        return payload.indexOf(account.id) === -1;
      });
    },
    FILTER_ACCOUNTS: state => {
      let accounts = state.accounts.all;
      const filters = state.filters;

      if (filters.name.length > 0) {
        accounts = accounts.filter(account => {
          return (
            account.name.toLowerCase().search(filters.name.toLowerCase()) !== -1
          );
        });
      }
      state.accounts.filtered = accounts;
    },
    SET_FILTERS_NAME: (state, payload) => {
      state.filters.name = payload;
    },
    UPDATE_ACCOUNT: (state, newAccount) => {
      state.accounts.all = state.accounts.all.map(account => {
        if (account.id === newAccount.id) return newAccount;
        return account;
      });
    },
    SET_ACCOUNT_FOR_ASSIGNING_TAGS: (state, account) => {
      state.accounts.forAssigningTags = account;
    },
    
    SET_ACCOUNT_TAGS: (state, newAccount) => {
      state.accounts.all = state.accounts.all.map(account => {
        if (account.id === newAccount.id) return newAccount;
        return account;
      });
    },

    SET_ACCOUNT_FOR_SHARE: (state, account) => {
      state.accounts.forShare = account;
    },
  },

  actions: {
    ...mixinDialogActions,

    async loadAccount(context, id) {
      const response = await this._vm.api.get(`/accounts/?account_id=${id}`);
      if (typeof response.data.data[0] !== 'undefined') {
        context.commit('UPDATE_ACCOUNT', response.data.data[0]);
        context.commit('FILTER_ACCOUNTS');
      }
    },

    LOAD_ACCOUNTS(context) {
      context.commit('SET_LOADING', {param: 'mainTable', value: true});
      this._vm.api('/accounts').then(response => {
        context.commit('SET_ALL_ACCOUNTS', response.data.data);
        context.commit('SET_FILTERED_ACCOUNTS', response.data.data);
        context.commit('SET_LOADING', {
          param: 'mainTable',
          value: false
        });
      });
    },

    SAVE_SELECTED_ACCOUNTS(context, payload) {
      context.commit('SET_SELECTED_ACCOUNTS', payload);
    },

    SAVE_FILTERS_NAME(context, payload) {
      context.commit('SET_FILTERS_NAME', payload);
      context.commit('FILTER_ACCOUNTS');
    },

    DELETE_ACCOUNTS(context, payload) {
      const hideLoading = this._vm.$message.loading('Удаляю', 0);
      this._vm.api.post('/accounts/delete', {
        ids: payload
      }).then(response => {
        hideLoading();
        if (response.data.success) {
          this._vm.$message.success('Удалил');
          context.commit('DELETE_ACCOUNTS', payload);
          context.commit('FILTER_ACCOUNTS');
        } else {
          this._vm.apiError(response);
        }
      }).catch(() => {
        hideLoading();
        this._vm.$message.error('Что-то пошло не так');
      });
    },

    async checkToken(context, account) {
      const hideLoading = this._vm.$message.loading('Проверяю токен', 0);
      const response = await this._vm.api(`/accounts/check_token/${account.id}`).catch(() => {
        hideLoading();
        this._vm.$message.error('Что-то пошло не так');
        return false;
      });

      hideLoading();
      
      switch(response.data.result) {
        case 'ok':
          this._vm.$message.success('Токен в порядке');
          break;
        case 'token_error':
          this._vm.$message.error('Токен отлетел');
          break;
        case 'connection_error':
          this._vm.$message.error('Ошибка соединения с аккаунтом. Вероятно, проблема с прокси.', 7);
          break;
      }

      context.dispatch('loadAccount', account.id);
    },

    async setAccountForAssigningTags(context, account) {
      context.commit('SET_ACCOUNT_FOR_ASSIGNING_TAGS', account);
    },

    async saveTags(context, account) {
      const hideLoading = this._vm.$message.loading('Сохраняю', 0);
      const response = await this._vm.api.post('/accounts/update_tags', account).catch(() => {
        hideLoading();
        this._vm.$message.error('Что-то пошло не так');
        return false;
      });

      hideLoading();

      if (response.data.success) {
        this._vm.$message.success('Сохранил');
        context.commit('SET_ACCOUNT_TAGS', account);
        context.commit('FILTER_ACCOUNTS');
        return true;
      } else {
        this._vm.$message.error('Что-то пошло не так');
        return false;
      }
    },

    async initAccountForShare(context, account) {
      context.commit('SET_ACCOUNT_FOR_SHARE', account);
      context.commit('OPEN_DIALOG', 'share');
      return true;
    },

    async savePermissions(context, account) {
      const hideLoading = this._vm.$message.loading('Сохраняю', 0);
      const response = await this._vm.api.post('/accounts/update_permissions', account).catch(() => {
        hideLoading();
        this._vm.$message.error('Что-то пошло не так');
        return false;
      });

      hideLoading();

      if (response.data.success) {
        this._vm.$message.success('Сохранил');
        context.commit('UPDATE_ACCOUNT', account);
        context.commit('FILTER_ACCOUNTS');
        return true;
      } else {
        this._vm.$message.error('Что-то пошло не так');
        return false;
      }
    },

    async addAccount(context, account) {
      context.commit('SET_LOADING', {
        param: 'addDialog',
        value: true
      });

      const response = await this._vm.api.post('/accounts/add', account).catch((error) => {
        context.dispatch('main/apiError', error, {
          root: true
        });
        
        return false;
      });

      context.commit('SET_LOADING', {
        param: 'addDialog',
        value: false
      });

      if (typeof response.data.success === 'undefined') {
        return false;
      }

      if (response.data.success) {
        context.commit('CLOSE_DIALOG', 'add');
        context.dispatch('LOAD_ACCOUNTS');
      } else {
        context.dispatch('main/apiError', response.data, {root: true});
      }

      return response.data.success;
    }
  }
};