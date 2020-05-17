import {
  mixinDialogMutations,
  mixinDialogActions,
  mixinDialogGetters
} from '../../mixins/vuex_dialogs';

export default {
  namespaced: true,
  state: {
    users: {
      all: [],
    }
  },
  getters: {
    ...mixinDialogGetters,
    allUsers: state => state.users.all,
  },
  mutations: {
    ...mixinDialogMutations,
    SET_ALL_USERS: (state, users) => {
      state.users.all = users;
    }
  },
  actions: {
    ...mixinDialogActions,
    async loadUsers(context) {
      const response = await this._vm.api('/users');
      if (response.data.success) {
        context.commit('SET_ALL_USERS', response.data.data);
      }
    }
  }
};