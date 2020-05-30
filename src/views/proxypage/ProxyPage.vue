<template>
  <div>
    <proxy-page-table />
  </div>
</template>

<script>
import {mapGetters}                 from 'vuex';

import ProxyPageTable               from '../../components/proxypage/table/ProxyPageTable';

export default {
    name: 'Ads',

    components: {
        ProxyPageTable
    },

    data() {
        return {
            updateInterval: null,
        };
    },

    computed: {
        ...mapGetters({
            users: 'users/users',
            accounts: 'accounts/ACCOUNTS',
            cabs: 'cabs/cabs',
            campaigns: 'campaigns/campaigns',
            adsets: 'adsets/adsets',
            ads: 'ads/ads',
        })
    },

    created() {
        this.$store.dispatch('ads/loadAds');
        this.updateInterval = setInterval(() => {
            this.$store.dispatch('ads/loadAds');
        }, 60000);
    },

    beforeDestroy() {
        clearInterval(this.updateInterval);
    },
};
</script>