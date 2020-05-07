<template>
  <div>
    <main-table />
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    import MainTable    from '../../components/adsmanager/cabs/CabsMainTable';

    export default {
        name: 'Cabs',

        components: {
          MainTable
        },

        data() {
          return {
            updateStatInterval: 0,
          };
        },

        computed: {
          ...mapGetters({
            accounts: 'accounts/filtered',
          })
        },

        watch: {
          accounts: {
            deep: true,
            handler() {
              this.$store.dispatch('cabs/loadCabs');
            }
          }
        },

        created() {
          this.$store.dispatch('cabs/loadCabs');
          this.updateStatInterval = setInterval(() => {
            this.$store.dispatch('cabs/loadCabs');
          }, 60000);
        },

        beforeDestroy() {
          clearInterval(this.updateStatInterval);
        },
    };
</script>