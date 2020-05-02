<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0px 8px 0px 8px">
        <!-- ТАБЛИЦА -->
        <v-data-table
          v-model="selected"
          :headers="cols"
          :items="accounts.filtered"
          :loading="loading.mainTable"
          :loading-text="$t('common.loading')"
          fixed-header
          :items-per-page="10"
          :height="innerHeight - 50 - 48"
          show-select
          disable-pagination
          hide-default-footer
          class="elevation-1 stat-table"
        >
          <template #body="{items}">
            <tbody>
              <tr
                v-for="item in items"
                :key="`row-${item.id}`"
              >
                <td>
                  <div style="margin-left: 9px;">
                    <v-simple-checkbox
                      v-ripple
                      color="primary"
                      :value="typeof selected.find(account => account.id === item.id) !== 'undefined'"
                      style="width: 24px;"
                      @input="selectAccount($event, item)"
                    />
                  </div>
                </td>
                <td>
                  <accounts-main-table-info :account="item" />
                </td>
                <td>
                  <accounts-main-table-status :account="item" />
                </td>
                <template v-for="col in profile.columns">
                  <simple-stat-cell
                    v-if="commonCols.indexOf(col) > -1"
                    :key="`stat-col-${col}`"
                    :col="col"
                    :item="item"
                  />
                  <complex-stat-cell-quantity
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-quantity`"
                    :col="col"
                    :item="item"
                  />
                  <complex-stat-cell-cr
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-cr`"
                    :col="col"
                    :item="item"
                  />
                  <complex-stat-cell-cpa
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-cpa`"
                    :col="col"
                    :item="item"
                  />
                </template>
              </tr>

              <!-- TOTAL -->
              <tr v-if="accounts.filtered.length > 0">
                <td
                  colspan="3"
                  style="font-weight: bold;"
                >
                  &nbsp;
                </td>
                <template v-for="col in profile.columns">
                  <simple-stat-cell
                    v-if="commonCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-total`"
                    :col="col"
                    it-is-total-row
                  />
                  <complex-stat-cell-quantity
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-quantity-total`"
                    :col="col"
                    it-is-total-row
                  />
                  <complex-stat-cell-cr
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-cr-total`"
                    :col="col"
                    it-is-total-row
                  />
                  <complex-stat-cell-cpa
                    v-if="actionCols.indexOf(col) > -1"
                    :key="`stat-col-${col}-cpa-total`"
                    :col="col"
                    it-is-total-row
                  />
                </template>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters }                                     from 'vuex';

import actionCols                                         from '../../../constants/adsmanager/action_cols';
import commonCols                                         from '../../../constants/adsmanager/common_cols';
import makeCols                                           from '../../../mixins/adsmanager/make_cols';
import ComplexStatCellCpa                                 from '../stat-cells/AdsManagerComplexStatCellCpa';
import ComplexStatCellCr                                  from '../stat-cells/AdsManagerComplexStatCellCr';
import ComplexStatCellQuantity                            from '../stat-cells/AdsManagerComplexStatCellQuantity';
import SimpleStatCell                                     from '../stat-cells/AdsManagerSimpleStatCell';

import AccountsMainTableInfo                              from './AccountsMainTableInfo';
import AccountsMainTableStatus                            from './AccountsMainTableStatus';

export default {
  components: {
    AccountsMainTableStatus,
    AccountsMainTableInfo,
    SimpleStatCell,
    ComplexStatCellQuantity,
    ComplexStatCellCr,
    ComplexStatCellCpa
  },

  mixins: [makeCols],

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

  watch: {
    selected: {
      deep: true,
      handler() {
        this.$store.dispatch('accounts/saveSelectedAccounts', this.selected);
      }
    }
  },

  async created() {
    await this.$store.dispatch('main/loadProfile');

    this.cols.push({
      text: this.$t('common.account'),
      value: 'account',
      width: 150
    });
    this.cols.push({
      text: this.$t('common.status'),
      value: 'status',
      width: 100
    });

    const statCols = this.makeCols();
    this.cols = this.cols.concat(statCols);
  },

  methods: {
    selectAccount(state, account) {
      if (state === true) {
        this.selected.push(account);
      } else {
        this.selected = this.selected.filter(a => {
          if (a.id === account.id) return false;
          return true;
        });
      }
    }
  }
};
</script>