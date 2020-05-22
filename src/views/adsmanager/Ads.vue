<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import MainTable from '../../components/adsmanager/ads/AdsMainTable';
import Topbar    from '../../components/adsmanager/ads/AdsTopbar';

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