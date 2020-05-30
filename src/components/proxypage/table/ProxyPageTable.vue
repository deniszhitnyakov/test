<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0px 8px 0px 8px">
        <!-- ТАБЛИЦА -->
        <v-data-table
          :value="selected"
          :headers="cols"
          :items="proxy.all"
          :loading="loading.mainTable"
          :loading-text="$t('common.loading')"
          fixed-header
          :items-per-page="10"
          :footer-props="{'items-per-page-options': [10, 30, 50, 100, -1]}"
          :height="innerHeight - 50 - 48 - 48"
          @click:row="handleRowClicked"
        />
      </v-card-text>
    </v-card>
    <proxy-modal />
  </div>
</template>

<script>
import {mapGetters}                                               from 'vuex';

import customSort                                                 from '../../../mixins/adsmanager/custom_sort'; 
import selectItems                                                from '../../../mixins/adsmanager/select_items';
import ProxyModal                                                 from '../modal/ProxyModal';

export default {
    name: 'ProxyPageTable',

    components: {
        ProxyModal
    },

    mixins: [
        customSort,
        selectItems
    ],

    data() {
        return {
            cols: [
                {
                    text: this.$t('common.id'),
                    value: 'id',
                    width: 50
                },
                {
                    text: this.$t('common.name'),
                    value: 'name',
                    width: 100
                },
                {
                    text: this.$t('proxy.type'),
                    value: 'type',
                    width: 70
                },
                {
                    text: this.$t('proxy.ip'),
                    value: 'ip',
                    width: 120
                },
                {
                    text: this.$t('proxy.externalIp'),
                    value: 'external_ip',
                    width: 120
                },
                {
                    text: this.$t('proxy.port'),
                    value: 'port',
                    width: 100
                },
                {
                    text: this.$t('common.login'),
                    value: 'login',
                    width: 100
                },
                {
                    text: this.$t('common.password'),
                    value: 'password',
                    width: 100
                },
                {
                    text: this.$t('proxy.accQuantity'),
                    value: 'status',
                    width: 100
                }
            ],
        };
    },

    computed: {
        ...mapGetters({
            proxy: 'proxy/proxy',
            selected: 'ads/selected',
            loading: 'ads/loading',
            innerHeight: 'main/innerHeight'
        })
    },

    created() {
        this.$store.dispatch('proxy/loadProxy');
        this.updateInterval = setInterval(() => {
            this.$store.dispatch('proxy/loadProxy');
        }, 60000);
    },
    methods: {
        handleRowClicked (value) {
            this.$store.dispatch('proxy/toggleModal');
            this.$store.dispatch('proxy/getProxyName', {id: value.id, name: value.name});
        }
    }
};
</script>
<style>
  .stat-table-ads div.v-data-table__wrapper > table > tbody > tr > td:nth-child(1), 
  .stat-table-ads div.v-data-table__wrapper > table > thead > tr > th:nth-child(1) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 0; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-ads div.v-data-table__wrapper > table > tbody > tr > td:nth-child(2), 
  .stat-table-ads div.v-data-table__wrapper > table > thead > tr > th:nth-child(2) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 48px; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-ads div.v-data-table__wrapper > table > tbody > tr > td:nth-child(3), 
  .stat-table-ads div.v-data-table__wrapper > table > thead > tr > th:nth-child(3) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 248px; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-ads div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(1), 
  .stat-table-ads div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(2),
  .stat-table-ads div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(3) {
    background: #2a2a2a;
  }

  .stat-table-ads div.v-data-table__wrapper > table > thead > tr > th:nth-child(1),
  .stat-table-ads div.v-data-table__wrapper > table > thead > tr > th:nth-child(2),
  .stat-table-ads div.v-data-table__wrapper > table > thead > tr > th:nth-child(3) {
    z-index: 4 !important;
  }
</style>