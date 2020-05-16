<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    import MainTable    from '../../components/adsmanager/cabs/CabsMainTable';
    import Topbar       from '../../components/adsmanager/cabs/CabsTopbar';

    export default {
        name: 'Cabs',

        components: {
          MainTable,
          Topbar
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