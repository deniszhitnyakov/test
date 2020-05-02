<template>
  <v-row class="topbar-row">
    <filters-bar 
      v-if="showFilters"
      :show="showFilters"
      @close="showFilters = false"
    />
    <!-- ЛЕВАЯ ЧАСТЬ -->
    <v-col
      cols="12"
      sm="7"
    >
      <v-row>
        <!-- МАССОВЫЕ ДЕЙСТВИЯ -->
        <v-col
          cols="12"
          sm="4"
        >
          <!-- МАССОВЫЕ ДЕЙСТВИЯ - НАЗНАЧИТЬ ТЕГИ -->
          <div style="float: left;">
            <v-btn
              small
              :disabled="accounts.selected.length === 0"
              color="primary"
              text
              style="min-width: 0; width: 30px; margin-top: 1px;"
            >
              <v-icon :size="12">
                fas fa-tags
              </v-icon>
            </v-btn>
          </div>

          <!-- МАССОВЫЕ ДЕЙСТВИЯ - ПОДЕЛИТЬСЯ -->
          <div style="float: left;">
            <v-btn
              small
              :disabled="accounts.selected.length === 0"
              color="primary"
              text
              style="min-width: 0; width: 30px; margin-top: 1px;"
            >
              <v-icon :size="12">
                fas fa-share-alt
              </v-icon>
            </v-btn>
          </div>

          <!-- МАССОВЫЕ ДЕЙСТВИЯ - ПРОВЕРИТЬ ТОКЕН -->
          <div style="float: left;">
            <v-btn
              small
              :disabled="accounts.selected.length === 0"
              color="primary"
              text
              style="min-width: 0; width: 30px; margin-top: 1px;"
            >
              <v-icon :size="12">
                fas fa-code
              </v-icon>
            </v-btn>
          </div>
          <!-- МАССОВЫЕ ДЕЙСТВИЯ - УДАЛИТЬ -->
          <div style="float: left;">
            <v-btn
              small
              :disabled="accounts.selected.length === 0"
              color="primary"
              text
              style="min-width: 0; width: 30px; margin-top: 1px;"
            >
              <v-icon :size="12">
                fas fa-trash
              </v-icon>
            </v-btn>
          </div>

          <!-- МАССОВЫЕ ДЕЙСТВИЯ - ИНДИКАТОР -->
          <div style="float: left;">
            <div
              class="body-2 ml-3"
              :style="{color: accounts.selected.length > 0 ? '' : 'gray', paddingTop: '5px'}"
            >
              {{ $t('common.selected') }}: {{ accounts.selected.length }}
            </div>
          </div>
        </v-col>

        <!-- КНОПКИ ДЕЙСТВИЙ -->
        <v-col
          cols="12"
          sm="8"
        >
          <!-- КНОПКИ ДЕЙСТВИЙ - ДОБАВИТЬ АККАУНТ -->
          <div style="float: right;">
            <v-btn
              small
              color="primary"
              text
              style="min-width: 0; margin-top: 1px;"
              class="ml-3"
              @click="$store.dispatch('accounts/openDialog', 'add')"
            >
              <v-icon :size="18">
                add
              </v-icon>

              {{ $t('common.add') }} {{ $t('common.account') }}
            </v-btn>
          </div>

          <!-- КНОПКИ ДЕЙСТВИЙ - ДОБАВИТЬ АККАУНТ -->
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

          <!-- КНОПКИ ДЕЙСТВИЙ - ЭКСПОРТ ДАННЫХ -->
          <div style="float: right;">
            <v-btn
              small
              color="primary"
              text
              style="min-width: 0; width: 30px; margin-top: 1px;"
              class="ml-3"
            >
              <v-icon :size="18">
                import_export
              </v-icon>
            </v-btn>
          </div>

          <!-- КНОПКИ ДЕЙСТВИЙ - ФИЛЬТРЫ -->
          <div style="float: right;">
            <v-btn
              small
              :text="activeFiltersCount === 0"
              :color="activeFiltersCount === 0 ? 'primary' : 'red'"
              style="margin-top: 1px;"
              @click="showFilters = true"
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
          </div>
        </v-col>
      </v-row>
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
import { mapGetters }       from 'vuex';

import accountsStatuses     from '../../../constants/accounts/accounts-statuses';
import TopbarCols           from '../AdsManagerTopbarCols';
import FiltersDate          from '../filters/AdsManagerFiltersDate';

import FiltersBar           from './AccountsFiltersBar';

export default {
  name: 'AccountsTopbar',

  components: {
    FiltersBar,
    FiltersDate,
    TopbarCols
  },

  data() {
    return {
      nameSearchText: '',
      accountsStatuses,
      showFilters: false,
    };
  },
  
  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      filters: 'accounts/FILTERS',
      tags: 'tags/tags',
      globalFilters: 'adsmanager/filters'
    }),

    activeFiltersCount() {
      let count = 0;

      if (this.filters.statuses.length > 0) count++;
      if (this.globalFilters.tags.length > 0) count++;

      return count;
    }
  },

  methods: {
    filterName(name) {
      this.nameSearchText = name;
      setTimeout(async () => {
        if (name === this.nameSearchText) {
          await this.$store.dispatch('accounts/setFiltersName', name);
          this.$store.dispatch('accounts/loadStat');
        }  
      }, 500);
    },
  }
};
</script>

<style scoped></style>
