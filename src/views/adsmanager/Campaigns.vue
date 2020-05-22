<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import MainTable from '../../components/adsmanager/campaigns/CampaignsMainTable';
import Topbar    from '../../components/adsmanager/campaigns/CampaignsTopbar';

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