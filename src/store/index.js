import Vuex from 'vuex';
import Vue from 'vue';

import adsmanager from './modules/adsmanager.js';
import accounts from './modules/accounts.js';
import bundles from './modules/bundles.js';
import jobs from './modules/jobs.js';
import main from './modules/main.js';
import tags from './modules/tags.js';
import users from './modules/users.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        adsmanager,
        main,
        jobs,
        bundles,
        accounts,
        tags,
        users
    },
});