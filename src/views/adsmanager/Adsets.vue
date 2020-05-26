<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import MainTable    from '../../components/adsmanager/adsets/AdsetsMainTable';
import Topbar       from '../../components/adsmanager/adsets/AdsetsTopbar';

export default {
    name: 'Adsets',

    components: {
        MainTable,
        Topbar,
    },

    data() {
        return {
            updateInterval: null,
        };
    },

    computed: {
        ...mapGetters({
            adsets: 'adsets/adsets'
        })
    },

    watch: {
        'adsets.selected': {
            deep: true,
            handler(newVal, oldVal) {
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.$store.dispatch('ads/clearSelected');
                }
            }
        }
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