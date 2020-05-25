<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0px 8px 0px 8px">
        <!-- ТАБЛИЦА -->
        <v-data-table
          :value="selected"
          :headers="cols"
          :items="accounts.filtered"
          :loading="loading.mainTable"
          :loading-text="$t('common.loading')"
          fixed-header
          :items-per-page="50"
          :height="innerHeight - 50 - 48 - 48"
          show-select
          class="elevation-1 stat-table stat-table-accounts"
          :custom-sort="customSort"
          :footer-props="{'items-per-page-options': [10, 30, 50, 100, -1]}"
          @item-selected="selectItem"
        >
          <template #header.data-table-select="{ on , props }">
            <v-simple-checkbox
              color="primary"
              v-bind="props"
              style="width: 48px; text-align: center;"
              v-on="on"
            />
          </template>
          <template #body="{items}">
            <tbody>
              <tr
                v-for="item in items"
                :key="`row-${item.id}`"
              >
                <td
                  style=""
                >
                  <div>
                    <v-simple-checkbox
                      v-ripple
                      color="primary"
                      :value="typeof accounts.selected.find(account => account.id === item.id) !== 'undefined'"
                      style="width: 48px; text-align: center;"
                      @input="selectItem(item, $event)"
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
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
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
import { mapGetters }                                             from 'vuex';

import actionCols                                                 from '../../../constants/adsmanager/action_cols';
import commonCols                                                 from '../../../constants/adsmanager/common_cols';
import customSort                                                 from '../../../mixins/adsmanager/custom_sort';
import makeCols                                                   from '../../../mixins/adsmanager/make_cols';
import selectItems                                                from '../../../mixins/adsmanager/select_items';  
import ComplexStatCellCpa                                         from '../stat-cells/AdsManagerComplexStatCellCpa';
import ComplexStatCellCr                                          from '../stat-cells/AdsManagerComplexStatCellCr';
import ComplexStatCellQuantity                                    from '../stat-cells/AdsManagerComplexStatCellQuantity';
import SimpleStatCell                                             from '../stat-cells/AdsManagerSimpleStatCell';

import AccountsMainTableInfo                                      from './AccountsMainTableInfo';
import AccountsMainTableStatus                                    from './AccountsMainTableStatus';

export default {
  components: {
    AccountsMainTableStatus,
    AccountsMainTableInfo,
    SimpleStatCell,
    ComplexStatCellQuantity,
    ComplexStatCellCr,
    ComplexStatCellCpa
  },

  mixins: [
    makeCols, 
    customSort,
    selectItems
  ],

  data: function() {
    return ({
      // selected: [],
      cols: [],
      nativeCols: [],
      commonCols,
      actionCols,
    });
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      loading: 'accounts/loading',
      innerHeight: 'main/innerHeight',
      profile: 'main/profile',
      stat: 'accounts/stat',
      selected: 'accounts/selected'
    }),
  },

  watch: {
    profile: {
      deep: true,
      handler(newProfile, oldProfile) {
        if (oldProfile.columns.length === 0) return;
        if (JSON.stringify(newProfile.columns) !== JSON.stringify(oldProfile.columns)) {
          const newCols = this.makeCols();
          this.cols = [];
          this.cols = this.cols.concat(this.nativeCols);
          this.cols = this.cols.concat(newCols);
          this.$forceUpdate();
        }
      }
    }
  },

  async created() {
    await this.$store.dispatch('main/loadProfile');

    this.nativeCols.push({
      text: this.$t('common.account'),
      value: 'account',
      width: 150
    });
    this.nativeCols.push({
      text: this.$t('common.status'),
      value: 'status',
      width: 100
    });

    const statCols = this.makeCols();
    this.cols = this.cols.concat(this.nativeCols);
    this.cols = this.cols.concat(statCols);
  },
};
</script>
<style>
  .stat-table-accounts div.v-data-table__wrapper > table > tbody > tr > td:nth-child(1), 
  .stat-table-accounts div.v-data-table__wrapper > table > thead > tr > th:nth-child(1) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 0; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-accounts div.v-data-table__wrapper > table > tbody > tr > td:nth-child(2), 
  .stat-table-accounts div.v-data-table__wrapper > table > thead > tr > th:nth-child(2) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 48px; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-accounts div.v-data-table__wrapper > table > tbody > tr > td:nth-child(3), 
  .stat-table-accounts div.v-data-table__wrapper > table > thead > tr > th:nth-child(3) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 198px; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-accounts div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(1), 
  .stat-table-accounts div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(2), 
  .stat-table-accounts div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(3) {
    background: #2a2a2a;
  }

  .stat-table-accounts div.v-data-table__wrapper > table > thead > tr > th:nth-child(1),
  .stat-table-accounts div.v-data-table__wrapper > table > thead > tr > th:nth-child(2),
  .stat-table-accounts div.v-data-table__wrapper > table > thead > tr > th:nth-child(3) {
    z-index: 4 !important;
  }
</style>