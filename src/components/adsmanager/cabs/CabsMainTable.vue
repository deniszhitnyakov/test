<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0px 8px 0px 8px">
        <!-- ТАБЛИЦА -->
        <v-data-table
          :value="selected"
          :headers="cols"
          :items="cabs.filtered"
          :loading="loading.mainTable"
          :loading-text="$t('common.loading')"
          fixed-header
          :items-per-page="50"
          :footer-props="{'items-per-page-options': [10, 30, 50, 100, -1]}"
          :height="innerHeight - 50 - 48 - 48"
          show-select
          class="elevation-1 stat-table stat-table-cabs"
          :custom-sort="customSort"
          @toggle-select-all="selectAll"
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
                <!-- ГАЛОЧКА -->
                <td>
                  <div>
                    <v-simple-checkbox
                      v-ripple
                      color="primary"
                      :value="typeof selected.find(cab => cab.id === item.id) !== 'undefined'"
                      style="width: 48px; text-align: center;"
                      @input="selectItem(item, $event)"
                    />
                  </div>
                </td>

                <!-- ОСНОВНАЯ ИНФОРМАЦИЯ -->
                <td>
                  <cabs-main-table-info :cab="item" />
                </td>
                <!-- БИЛЛИНГ -->
                <billing-cell
                  :cab="item"
                />
                <!-- СТАТУС -->
                <td>
                  <cabs-main-table-status :cab="item" />
                </td>
                <template v-for="col in profile.columns">
                  <simple-stat-cell
                    v-if="commonCols.indexOf(col) > -1 && specialCols.indexOf(col) === -1"
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
              <tr v-if="cabs.filtered.length > 0">
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <template v-for="col in profile.columns">
                  <simple-stat-cell
                    v-if="commonCols.indexOf(col) > -1 && specialCols.indexOf(col) === -1"
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
import {mapGetters}                                               from 'vuex';

import actionCols                                                 from '../../../constants/adsmanager/action_cols';
import commonCols                                                 from '../../../constants/adsmanager/common_cols';  
import specialCols                                                from '../../../constants/adsmanager/special_cols';  
import customSort                                                 from '../../../mixins/adsmanager/custom_sort';
import makeCols                                                   from '../../../mixins/adsmanager/make_cols';  
import selectItems                                                from '../../../mixins/adsmanager/select_items';  
import BillingCell                                                from '../stat-cells/AdsManagerBillingCell';
import ComplexStatCellCpa                                         from '../stat-cells/AdsManagerComplexStatCellCpa';
import ComplexStatCellCr                                          from '../stat-cells/AdsManagerComplexStatCellCr';
import ComplexStatCellQuantity                                    from '../stat-cells/AdsManagerComplexStatCellQuantity';
import SimpleStatCell                                             from '../stat-cells/AdsManagerSimpleStatCell';

import CabsMainTableInfo                                          from './CabsMainTableInfo';
import CabsMainTableStatus                                        from './CabsMainTableStatus';

export default {
  name: 'CabsMainTable',

  components: {
    SimpleStatCell,
    ComplexStatCellQuantity,
    ComplexStatCellCr,
    ComplexStatCellCpa,
    CabsMainTableInfo,
    CabsMainTableStatus,
    BillingCell
  },

  mixins: [
    makeCols,
    customSort,
    selectItems
  ],

  data() {
    return {
      actionCols,
      commonCols,
      specialCols,
      cols: [],
      level: 'cabs',
    };
  },

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs',
      selected: 'cabs/selected',
      loading: 'cabs/loading',
      innerHeight: 'main/innerHeight',
      profile: 'main/profile',
    }),

    firstCols() {
      let cols = [];

      cols.push({
        text: this.$t('common.cab'),
        value: 'cab',
        width: 150
      });

      cols.push({
        text: this.$t('adsmanager.cols.billing'),
        value: 'billing',
        width: 200,
        sortable: false,
      });

      cols.push({
        text: this.$t('common.status'),
        value: 'status',
        width: 100
      });

      return cols;
    }
  },

  watch: {
    profile: {
      deep: true,
      handler() {
        this.cols = this.makeCols(this.firstCols);
      }
    }
  },

  created() {
    this.cols = this.makeCols(this.firstCols);
  },
};
</script>
<style>
  .stat-table-cabs div.v-data-table__wrapper > table > tbody > tr > td:nth-child(1), 
  .stat-table-cabs div.v-data-table__wrapper > table > thead > tr > th:nth-child(1) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 0; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-cabs div.v-data-table__wrapper > table > tbody > tr > td:nth-child(2), 
  .stat-table-cabs div.v-data-table__wrapper > table > thead > tr > th:nth-child(2) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 48px; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-cabs div.v-data-table__wrapper > table > tbody > tr > td:nth-child(3), 
  .stat-table-cabs div.v-data-table__wrapper > table > thead > tr > th:nth-child(3) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 198px; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-cabs div.v-data-table__wrapper > table > tbody > tr > td:nth-child(4), 
  .stat-table-cabs div.v-data-table__wrapper > table > thead > tr > th:nth-child(4) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 398px; 
    z-index: 3;
    background: #1e1e1e;
  }

  .stat-table-cabs div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(1), 
  .stat-table-cabs div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(2), 
  .stat-table-cabs div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(3),
  .stat-table-cabs div.v-data-table__wrapper > table > tbody > tr:hover > td:nth-child(4) {
    background: #2a2a2a;
  }

  .stat-table-cabs div.v-data-table__wrapper > table > thead > tr > th:nth-child(1),
  .stat-table-cabs div.v-data-table__wrapper > table > thead > tr > th:nth-child(2),
  .stat-table-cabs div.v-data-table__wrapper > table > thead > tr > th:nth-child(3),
  .stat-table-cabs div.v-data-table__wrapper > table > thead > tr > th:nth-child(4) {
    z-index: 4 !important;
  }
</style>