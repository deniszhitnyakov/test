import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import i18n from './i18n'
import axios from 'axios';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Clipboard from 'v-clipboard';
import store from './store/index.js';
import apiError from './mixins/api_error_root';
import Cookies from "js-cookie";

import AdsManager from './views/adsmanager/AdsManager'

const routes = [
  {
    path: "/adsmanager",
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
console.log(store);

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
}).$mount("#app");
