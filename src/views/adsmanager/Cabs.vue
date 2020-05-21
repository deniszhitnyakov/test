<template>
  <div>
    <dialog-attach-card v-if="dialogs.attachCard" />
    <dialog-change-country v-if="dialogs.changeCountry" />
    <dialog-create-pixel v-if="dialogs.createPixel" />
    <dialog-rename v-if="dialogs.rename" />
    <dialog-share v-if="dialogs.share" />
    <dialog-tags v-if="dialogs.tags" />
    
    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters}          from 'vuex';

import DialogAttachCard      from '../../components/adsmanager/cabs/CabsDialogAttachCard';
import DialogChangeCountry   from '../../components/adsmanager/cabs/CabsDialogChangeCountry';
import DialogCreatePixel     from '../../components/adsmanager/cabs/CabsDialogCreatePixel';
import DialogRename          from '../../components/adsmanager/cabs/CabsDialogRename';
import DialogShare           from '../../components/adsmanager/cabs/CabsDialogShare';
import DialogTags            from '../../components/adsmanager/cabs/CabsDialogTags';
import MainTable             from '../../components/adsmanager/cabs/CabsMainTable';
import Topbar                from '../../components/adsmanager/cabs/CabsTopbar';

export default {
  name: 'Cabs',

  components: {
    DialogAttachCard,
    DialogChangeCountry,
    DialogCreatePixel,
    DialogRename,
    DialogShare, 
    DialogTags,
    MainTable,
    Topbar,
  },

  data() {
    return {
      updateStatInterval: 0,
    };
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/filtered',
      globalFilters: 'adsmanager/filters',
      filters: 'cabs/filters',
      dialogs: 'cabs/dialogs'
    })
  },

  watch: {
    accounts: {
      deep: true,
      handler() {
        this.$store.dispatch('cabs/loadCabs');
      }
    },

    globalFilters: {
      deep: true,
      handler() {
        this.filterCabs();
      }
    },

    filters: {
      deep: true,
      handler() {
        this.filterCabs();
      }
    }
  },

  created() {
    this.$store.dispatch('cabs/loadFilters');
    this.$store.dispatch('cabs/loadCabs');
    this.updateStatInterval = setInterval(() => {
      this.$store.dispatch('cabs/loadCabs');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateStatInterval);
  },

  methods: {
    async filterCabs() {
      await this.$store.dispatch('cabs/filterCabs');
      await this.$store.dispatch('cabs/loadStat');
    }
  },
};
</script>