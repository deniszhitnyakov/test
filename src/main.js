import '@fortawesome/fontawesome-free/css/all.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import axios                  from 'axios';
import Cookies                from 'js-cookie';
import moment                 from 'moment';
import Clipboard              from 'v-clipboard';
import VueRouter              from 'vue-router';
import Vuex                   from 'vuex';
import Vue                    from 'vue';

import App                    from './App.vue';
import i18n                   from './i18n';
import apiError               from './mixins/api_error_root';
import vuetify                from './plugins/vuetify';
import store                  from './store/index.js';
import AdsManager             from './views/adsmanager/AdsManager';

Vue.prototype.monent = moment;

const routes = [
  {
    path: '/adsmanager',
    component: AdsManager,
  },
];

let api, baseUrl;
if (location.hostname === 'localhost') {
  api = axios.create({
    baseURL: 'https://my.dolphin.ru.com/new',
    headers: {
      Authorization: '5-ef7f6ab188cd804e941fe6f4ad27719f'
    }
    // baseURL: 'https://romochekaz.xyz/new',
    //   headers: {
    //     Authorization: '4-f0b5fbc8cab8f36a2695ae2dc0f5d279'
    //   }
  });

  baseUrl = 'https://my.dolphin.ru.com';
} else {
  api = axios.create({
    baseURL: `${location.protocol}//${location.hostname}/new`,
    headers: {
      Authorization: `${Cookies.get('user_id')}-${Cookies.get('hash')}`
    }
  });

  baseUrl = `${location.protocol}//${location.hostname}`;
}

const router = new VueRouter({
  routes,
});

Vue.prototype.api = api;
Vue.prototype.apiError = apiError;
Vue.prototype.baseUrl = baseUrl;
store.api = api;

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Clipboard);

new Vue({
  vuetify,
  i18n,
  router,
  store,
  api,
  render: (h) => h(App),
}).$mount('#app');
