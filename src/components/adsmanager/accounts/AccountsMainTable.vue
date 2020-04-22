<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0px 8px 0px 8px">
        <!-- // КНОПКА ДОБАВЛЕНИЯ -->
        <v-btn
          fixed
          dark
          fab
          bottom
          right
          color="pink"
          x-small
          @click="$store.dispatch('accounts/openDialog', 'add')"
        >
          <v-icon>
            fas fa-plus
          </v-icon>
        </v-btn>

        <!-- ТАБЛИЦА -->
        <v-data-table
          v-model="selected"
          :headers="cols"
          :items="accounts.filtered"
          show-expand
          :loading="loading.mainTable"
          :loading-text="$t('common.loading')"
          fixed-header
          :items-per-page="10"
          :height="innerHeight - 50 - 48"
          show-select
          disable-pagination
          hide-default-footer
          class="elevation-1"
        >
          <!-- СТОЛБЕЦ - АККАУНТ -->
          <template v-slot:item.account="{ item }">
            <accounts-main-table-info :account="item" />
          </template>

          <!-- СТОЛБЕЦ - СТАТУС -->
          <template v-slot:item.status="{ item }">
            <accounts-main-table-status :account="item" />
          </template>

          <!-- СТОЛБЕЦ - ДЕЙСТВИЯ -->
          <template v-slot:item.actions="{ item }">
            <accounts-main-table-actions :account="item" />
          </template>

          <!-- ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ -->
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div>
                {{ $t('common.dolphinId') }}: {{ item.id }}
              </div>
              <accounts-main-table-facebook-profile :account="item" />
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters }                   from 'vuex';

import AccountsMainTableFacebookProfile from './AccountsMainTableFacebookProfile';
import AccountsMainTableInfo            from './AccountsMainTableInfo';
import AccountsMainTableStatus          from './AccountsMainTableStatus';

export default {
  components: {
    AccountsMainTableFacebookProfile,
    AccountsMainTableStatus,
    AccountsMainTableInfo
  },
  data: function() {
    return ({
      selected: [],
      cols: [],
    });
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      loading: 'accounts/loading',
      innerHeight: 'main/innerHeight',
      profile: 'main/profile',
    }),
  },

  async created() {
    await this.$store.dispatch('main/loadProfile');
    this.makeCols();
  },

  methods: {
    makeCols() {
      let cols = [];
      cols.push({ text: '', value: 'data-table-expand', align: 'left', width: 35 });
      cols.push({ text: this.$t('common.account'), value: 'account', width: 150 });
      cols.push({ text: this.$t('common.status'), value: 'status', width:  100});

      this.profile.columns.forEach(col => {
        if (col.search('action') === 0) {
          cols.push({ text: `${this.$t(`adsmanager.cols.${col}`)} (${this.$t('common.quantity')})`, value: col, width: 100});
          cols.push({ text: `${this.$t(`adsmanager.cols.${col}`)} (${this.$t('common.conversionRate')})`, value: col, width: 100});
          cols.push({ text: `${this.$t(`adsmanager.cols.${col}`)} (${this.$t('common.cpa')})`, value: col, width: 100});
        } else {
          cols.push({ text: `${this.$t(`adsmanager.cols.${col}`)}`, value: col, width: 100});
        }
      });
      
      this.cols = cols;
    }
  }
};
</script>
