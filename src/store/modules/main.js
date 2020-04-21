export default {
  namespaced: true,
  state: {
    apiUrl: 'https://my.dolphin.ru.com/new/',
    user: {},
    breadcrumbs: [],
    sidebarCollapsed: false,
  },
  getters: {
    breadcrumbs: state => {
      return state.breadcrumbs;
    },
  },
  mutations: {
    setBreadcrumbs: ( state, breadcrumbs ) => {
      state.breadcrumbs = breadcrumbs;
    },
    
    toggleSidebar: ( state ) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },

    setUser: (state, user) => {
      state.user = {...user};
    }
  },
};