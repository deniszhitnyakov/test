import {
  mixinDialogMutations,
  mixinDialogActions,
  mixinDialogGetters
} from '../../mixins/vuex_dialogs';

export default {
  namespaced: true,
  state: {
    apiUrl: 'https://my.dolphin.ru.com/new/',
    user: {},
    breadcrumbs: [],
    sidebarCollapsed: false,
    dialogs: {
      apiError: false,
    },
    apiError: '',
    innerHeight: 0,
  },
  getters: {
    ...mixinDialogGetters,

    breadcrumbs: state => {
      return state.breadcrumbs;
    },

    apiError: state => state.apiError,
    innerHeight: state => state.innerHeight
  },
  mutations: {
    ...mixinDialogMutations,

    setBreadcrumbs: ( state, breadcrumbs ) => {
      state.breadcrumbs = breadcrumbs;
    },
    
    toggleSidebar: ( state ) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    setUser: (state, user) => {
      state.user = {...user};
    },

    SET_API_ERROR: (state, error) => {
      state.apiError = error;
    },

    SET_INNER_HEIGHT: (state, height) => {
      state.innerHeight = height;
    }
  },

  actions: {
    ...mixinDialogActions,

    async apiError(context, error) {
      context.commit('SET_API_ERROR', error);
      context.commit('OPEN_DIALOG', 'apiError');
    },

    async setInnerHeight(context, height) {
      context.commit('SET_INNER_HEIGHT', height);
    }
  }
};