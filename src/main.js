import '@fortawesome/fontawesome-free/css/all.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
import axios      from 'axios';
import Cookies    from 'js-cookie';
import moment     from 'moment';
import Clipboard  from 'v-clipboard';
import FlagIcon   from 'vue-flag-icon';
import VueRouter  from 'vue-router';
import Vuex       from 'vuex';
import Vue        from 'vue';

import App        from './App.vue';
import i18n       from './i18n';
import apiError   from './mixins/api_error_root';
import vuetify    from './plugins/vuetify';
import store      from './store/index';
import AdsManager from './views/adsmanager/AdsManager';

Vue.prototype.moment = moment;

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
            Authorization: '1-9f7b3eb76fc9b4234add1cf3b37ebbee',
        },
    });

    baseUrl = 'https://my.dolphin.ru.com';
} else {
    api = axios.create({
        baseURL: `${location.protocol}//${location.hostname}/new`,
        headers: {
            Authorization: `${Cookies.get('user_id')}-${Cookies.get('hash')}`,
        },
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
Vue.use(FlagIcon);

new Vue({
    vuetify,
    i18n,
    router,
    store,
    api,
    render: (h) => h(App),
}).$mount('#app');
