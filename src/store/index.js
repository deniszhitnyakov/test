import Vuex       from 'vuex';
import Vue        from 'vue';

import accounts   from './modules/accounts.js';
import ads        from './modules/ads.js';
import adsets     from './modules/adsets.js';
import adsmanager from './modules/adsmanager.js';
import bundles    from './modules/bundles.js';
import cabs       from './modules/cabs.js';
import campaigns  from './modules/campaigns.js';
import dates      from './modules/dates.js';
import jobs       from './modules/jobs.js';
import main       from './modules/main.js';
import proxy      from './modules/proxy.js';
import tags       from './modules/tags.js';
import users      from './modules/users.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ads,
    adsets,
    adsmanager,
    campaigns,
    dates,
    main,
    jobs,
    bundles,
    accounts,
    tags,
    users,
    proxy,
    cabs
  },
});