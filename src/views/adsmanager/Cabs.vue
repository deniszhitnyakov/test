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
          setInterval(() => {
            this.$store.dispatch('cabs/loadCabs');
          }, 60000);
        }
    };
</script>