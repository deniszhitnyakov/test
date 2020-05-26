<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters}            from 'vuex';

import MainTable               from '../../components/adsmanager/ads/AdsMainTable';
import Topbar                  from '../../components/adsmanager/ads/AdsTopbar';

export default {
    name: 'Ads',

    components: {
        MainTable,
        Topbar
    },

    data() {
        return {
            updateInterval: null,
        };
    },

    // I made eror in word
    // And one mor eror

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