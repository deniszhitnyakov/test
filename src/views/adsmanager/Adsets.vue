<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import MainTable from '../../components/adsmanager/adsets/AdsetsMainTable';
import Topbar    from '../../components/adsmanager/adsets/AdsetsTopbar';

export default {
  name: 'Adsets',

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
    this.$store.dispatch('adsets/loadAdsets');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('adsets/loadAdsets');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
};
</script>