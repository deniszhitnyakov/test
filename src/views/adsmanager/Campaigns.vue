<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import MainTable    from '../../components/adsmanager/campaigns/CampaignsMainTable';
import Topbar       from '../../components/adsmanager/campaigns/CampaignsTopbar';

export default {
    name: 'Campaigns',

    components: {
        MainTable,
        Topbar
    },

    data() {
        return {
            updateInterval: null,
        };
    },

    computed: {
        ...mapGetters({
            campaigns: 'campaigns/campaigns'
        })
    },

    watch: {
        'campaigns.selected': {
            deep: true,
            handler(newVal, oldVal) {
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.$store.dispatch('adsets/clear');
                    this.$store.dispatch('ads/clear');
                }
            }
        }
    },

    created() {
        this.$store.dispatch('campaigns/loadCampaigns');
        this.updateInterval = setInterval(() => {
            this.$store.dispatch('campaigns/loadCampaigns');
        }, 60000);
    },

    beforeDestroy() {
        clearInterval(this.updateInterval);
    },
};
</script>