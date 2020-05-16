<template>
  <v-row class="topbar-row">
    <filters-bar
      v-if="showFilters"
      :show="showFilters"
      @close="showFilters = false"
    />
    <!-- ЛЕВАЯ ЧАСТЬ -->
    <v-col
      :cols="12"
      :sm="7"
    >
      <topbar-actions />
      
      <div style="float: right;">
        <!-- КНОПКИ ДЕЙСТВИЙ - ОБНОВИТЬ СТАТИСТИКУ -->
        <div style="float: right;">
          <v-btn
            small
            color="primary"
            text
            style="min-width: 0; width: 30px; margin-top: 1px;"
            class="ml-3"
          >
            <v-icon :size="18">
              sync
            </v-icon>
          </v-btn>
        </div>
          
        <!-- КНОПКИ ДЕЙСТВИЙ - СТОЛБЦЫ -->
        <div style="float: right;">
          <topbar-cols />
        </div>

        <!-- КНОПКИ ДЕЙСТВИЙ - ФИЛЬТРЫ -->
        <div style="float: right;">
          <v-menu
            offset-y
            open-on-hover
            close-on-click
          >
            <template v-slot:activator="{ on }">
              <v-btn
                small
                :text="activeFiltersCount === 0"
                :color="activeFiltersCount === 0 ? 'primary' : 'red'"
                style="margin-top: 1px;"
                @click="showFilters = true"
                v-on="on"
              >
                <v-icon
                  :size="18"
                  class="mr-1"
                >
                  filter_list
                </v-icon>
                {{ $t('common.filters') }}
                <span v-if="activeFiltersCount > 0">
                  ({{ activeFiltersCount }})
                </span>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                dense
                @click="$store.dispatch('cabs/setSpecificFilter', {filter: 'type', data: 'personal'});"
              >
                <v-list-item-title>
                  {{ $t('adsmanager.cabs.filters.personalCabs') }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item
                dense
                @click="$store.dispatch('cabs/setSpecificFilter', {filter: 'type', data: 'business'});"
              >
                <v-list-item-title>
                  {{ $t('adsmanager.cabs.filters.businessCabs') }}
                </v-list-item-title>
              </v-list-item>

              <v-divider />
              
              <v-list-item
                dense
                @click="$store.dispatch('cabs/setSpecificFilter', {filter: 'accountsStatuses', data: ['ACTIVE']});"
              >
                <v-list-item-title>
                  {{ $t('adsmanager.cabs.filters.underActiveAccounts') }}
                </v-list-item-title>
              </v-list-item>
              
              <v-list-item
                dense
                @click="$store.dispatch('cabs/setSpecificFilter', {filter: 'cabsStatuses', data: [{text: 'ACTIVE', color: 'success', value: 1}]});"
              >
                <v-list-item-title>
                  {{ $t('adsmanager.cabs.filters.active') }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item
                dense
                @click="$store.dispatch('cabs/setSpecificFilter', {filter: 'cabsStatuses', data: [{text: 'UNSETTLED',color: 'warning', value: 3}]});"
              >
                <v-list-item-title>
                  {{ $t('adsmanager.cabs.filters.withDebt') }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item
                dense
                @click="$store.dispatch('cabs/setSpecificFilter', {filter: 'cabsStatuses', data: [{text: 'DISABLED', color: 'red', value: 2}]});"
              >
                <v-list-item-title>
                  {{ $t('adsmanager.cabs.filters.onlyBlocked') }}
                </v-list-item-title>
              </v-list-item>

              <v-divider />

              <v-list-item
                dense
                @click="$store.dispatch('cabs/setSpecificFilter', {filter: 'attachedCard', data: 'with-card'});"
              >
                <v-list-item-title>
                  {{ $t('adsmanager.cabs.filters.withCard') }}
                </v-list-item-title>
              </v-list-item>

              <v-list-item
                dense
                @click="$store.dispatch('cabs/setSpecificFilter', {filter: 'attachedCard', data: 'without-card'});"
              >
                <v-list-item-title>
                  {{ $t('adsmanager.cabs.filters.withoutCard') }}
                </v-list-item-title>
              </v-list-item>

              <v-divider />

              <v-list-item
                dense
                @click="showFilters = true"
              >
                <v-list-item-title>
                  {{ $t('filters.seeAll') }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-col>
    <!-- ПРАВАЯ ЧАСТЬ -->
    <v-col
      cols="12"
      sm="5"
    >
      <v-row>
        <!-- ФИЛЬТР ПО ДАТЕ -->
        <v-col
          cols="12"
          sm="6"
        >
          <filters-date />
        </v-col>

        <!-- ПОИСК ПО НАЗВАНИЮ -->
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            dense
            clearable
            solo
            :label="$t('filters.searchByName')"
            single-line
            prepend-inner-icon="fas fa-search"
            hide-details
            @input="filterName"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
  import {mapGetters}         from 'vuex';

  import TopbarCols           from '../AdsManagerTopbarCols';
  import FiltersDate          from '../filters/AdsManagerFiltersDate';

  import FiltersBar           from './CabsFiltersBar';
  import TopbarActions        from './CabsTopbarActions';

  export default {
    name: 'CabsTopbar',

    components: {
      TopbarActions,
      TopbarCols,
      FiltersDate,
      FiltersBar
    },

    data() {
      return {
        showFilters: false,
        nameSearchText: '',
      };
    },

    computed: {
      ...mapGetters({
        filters: 'cabs/filters',
        globalFilters: 'adsmanager/filters'
      }),
      
      activeFiltersCount() {
        let count = 0;

        if (this.filters.accountsStatuses.length > 0) count++;
        if (this.filters.cabsStatuses.length > 0) count++;
        if (this.globalFilters.tags.length > 0) count++;
        if (this.filters.type !== 'all') count++;
        if (this.filters.attachedCard !== 'all') count++;

        return count;
      }
    },

    methods: {
      filterName(name) {
        this.nameSearchText = name;
        setTimeout(async () => {
          if (name === this.nameSearchText) {
            await this.$store.dispatch('cabs/setSpecificFilter', {filter: 'name', data: name});
          }  
        }, 500);
      },
    }
  };
</script>