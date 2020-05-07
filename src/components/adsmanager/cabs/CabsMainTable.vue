<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0px 8px 0px 8px">
        <!-- ТАБЛИЦА -->
        <v-data-table
          v-model="selected"
          :headers="cols"
          :items="cabs.filtered"
          :loading="loading.mainTable"
          :loading-text="$t('common.loading')"
          fixed-header
          :items-per-page="10"
          :height="innerHeight - 50 - 48"
          show-select
          disable-pagination
          hide-default-footer
          class="elevation-1 stat-table"
          :custom-sort="customSort"
        >
          <template #body="{items}">
            <tbody>
              <tr
                v-for="item in items"
                :key="`row-${item.id}`"
              >
                <td>
                  <div style="margin-left: 9px;">
                    <!-- <v-simple-checkbox
                      v-ripple
                      color="primary"
                      :value="typeof selected.find(account => account.id === item.id) !== 'undefined'"
                      style="width: 24px;"
                      @input="selectAccount($event, item)"
                    /> -->
                  </div>
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  <!-- <accounts-main-table-status :account="item" /> -->
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
              <tr v-if="cabs.filtered.length > 0">
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
  import {mapGetters}                                           from 'vuex';

  import actionCols                                             from '../../../constants/adsmanager/action_cols';
  import commonCols                                             from '../../../constants/adsmanager/common_cols';
  import customSort                                             from '../../../mixins/adsmanager/custom_sort';
  import makeCols                                               from '../../../mixins/adsmanager/make_cols';
  import ComplexStatCellCpa                                     from '../stat-cells/AdsManagerComplexStatCellCpa';
  import ComplexStatCellCr                                      from '../stat-cells/AdsManagerComplexStatCellCr';
  import ComplexStatCellQuantity                                from '../stat-cells/AdsManagerComplexStatCellQuantity';
  import SimpleStatCell                                         from '../stat-cells/AdsManagerSimpleStatCell';

  export default {
    name: 'CabsMainTable',

    components: {
      SimpleStatCell,
      ComplexStatCellQuantity,
      ComplexStatCellCr,
      ComplexStatCellCpa
    },

    mixins: [
      makeCols,
      customSort
    ],

    data() {
      return {
        actionCols,
        commonCols,
        cols: [],
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
          text: this.$t('common.status'),
          value: 'status',
          width: 150
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
    }
  };
</script>