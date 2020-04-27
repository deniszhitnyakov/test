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
          <template #items="{item}">
            <tr>
              <td>
                <accounts-main-table-info :account="item" />
              </td>
            </tr>
          </template>
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

          <!-- ОБЫЧНЫЕ СТОЛБЦЫ -->
          <template 
            v-for="col in commonCols"
            v-slot:[`item.${col}`]="{item}"
          >
            <div 
              :key="`col-${col}`"
              class="stat-digits"
            >
              <span
                v-if="typeof stat[item.id] !== 'undefined' && typeof stat[item.id][col] !== 'undefined'"
              >
                {{ stat[item.id][col] }}
              </span>
              <span
                v-if="typeof stat[item.id] === 'undefined' || typeof stat[item.id][col] === 'undefined'"
              >
                0
              </span>
              <span v-if="col === 'spend'"> USD</span>
              <span v-if="col === 'profit'"> USD</span>
              <span v-if="col === 'revenue'"> USD</span>
              <span v-if="col === 'roi'">%</span>
              <span v-if="col === 'approve'">%</span>
            </div>
          </template>

          <!-- СЛОЖНЫЕ СТОЛБЦЫ - КОЛИЧЕСТВО -->
          <template 
            v-for="col in actionCols"
            v-slot:[`item.${col}-quantity`]="{item}"
          >
            <span
              v-if="typeof stat[item.id] !== 'undefined' && typeof stat[item.id]['actions'] !== 'undefined'"
              :key="`col-${col}`"
              class="stat-digits"
            >
              <span v-if="typeof stat[item.id]['actions'][col] !== 'undefined'">
                {{ stat[item.id]['actions'][col]['quantity'] }}
              </span>
              <span
                v-if="typeof stat[item.id]['actions'][col] === 'undefined'"
                class="stat-digits"
              >
                0
              </span>
            </span>
          </template>

          <!-- СЛОЖНЫЕ СТОЛБЦЫ - CPA -->
          <template 
            v-for="col in actionCols"
            v-slot:[`item.${col}-cpa`]="{item}"
          >
            <span
              v-if="typeof stat[item.id] !== 'undefined' && typeof stat[item.id]['actions'] !== 'undefined'"
              :key="`col-${col}`"
              class="stat-digits"
            >
              <span v-if="typeof stat[item.id]['actions'][col] !== 'undefined'">
                {{ stat[item.id]['actions'][col]['cpa'] }} USD
              </span>
              <span
                v-if="typeof stat[item.id]['actions'][col] === 'undefined'"
                class="stat-digits"
              >
                -
              </span>
            </span>
          </template>

          <!-- СЛОЖНЫЕ СТОЛБЦЫ - CR -->
          <template 
            v-for="col in actionCols"
            v-slot:[`item.${col}-cr`]="{item}"
          >
            <span
              v-if="typeof stat[item.id] !== 'undefined' && typeof stat[item.id]['actions'] !== 'undefined'"
              :key="`col-${col}`"
              class="stat-digits"
            >
              <span v-if="typeof stat[item.id]['actions'][col] !== 'undefined'">
                {{ stat[item.id]['actions'][col]['cr'] }} %
              </span>
              <span
                v-if="typeof stat[item.id]['actions'][col] === 'undefined'"
                class="stat-digits"
              >
                -
              </span>
            </span>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters }                       from 'vuex';

import actionCols                           from '../../../constants/adsmanager/action_cols';
import commonCols                           from '../../../constants/adsmanager/common_cols';

import AccountsMainTableFacebookProfile     from './AccountsMainTableFacebookProfile';
import AccountsMainTableInfo                from './AccountsMainTableInfo';
import AccountsMainTableStatus              from './AccountsMainTableStatus';

export default {
  components: {
    AccountsMainTableFacebookProfile,
    AccountsMainTableStatus,
    AccountsMainTableInfo,
  },
  data: function() {
    return ({
      selected: [],
      cols: [],
      commonCols,
      actionCols
    });
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      loading: 'accounts/loading',
      innerHeight: 'main/innerHeight',
      profile: 'main/profile',
      stat: 'accounts/stat'
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
          cols.push({ text: `${this.$t(`adsmanager.cols.${col}`)} (${this.$t('common.quantity')})`, value: `${col}-quantity`, width: 100});
          cols.push({ text: `${this.$t(`adsmanager.cols.${col}`)} (${this.$t('common.conversionRate')})`, value: `${col}-cr`, width: 100});
          cols.push({ text: `${this.$t(`adsmanager.cols.${col}`)} (${this.$t('common.cpa')})`, value: `${col}-cpa`, width: 100});
        } else {
          cols.push({ text: `${this.$t(`adsmanager.cols.${col}`)}`, value: col, width: 100});
        }
      });
      
      this.cols = cols;
    }
  }
};
</script>
