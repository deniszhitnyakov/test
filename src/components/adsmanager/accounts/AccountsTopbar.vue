<template>
  <v-row class="topbar-row">
    <!-- ЛЕВАЯ ЧАСТЬ -->
    <v-col
      cols="12"
      sm="6"
    >
      <v-row>
        <!-- ФИЛЬТР ПО СТАТУСУ -->
        <v-col
          cols="12"
          sm="5"
        >
          <v-combobox
            :label="$t('filters.status')"
            :items="accountsStatuses"
            :value="filters.statuses"
            multiple
            chips
            dark
            deletable-chips
            clearable
            dense
            small-chips
            single-line
            solo
            prepend-inner-icon="fas fa-code"
            hide-details
            @change="filterStatus"
          />
        </v-col>

        <!-- ФИЛЬТР ПО ТЕГАМ -->
        <v-col
          cols="12"
          sm="5"
        >
          <filters-tags />
        </v-col>

        <!-- БОЛЬШЕ ФИЛЬТРОВ -->
        <v-col
          cols="12"
          sm="2"
        >
          <!-- <v-btn
            small
            text
            color="primary"
            style="margin-top: 5px;"
          >
            {{ $t('filters.more') }}
          </v-btn> -->
        </v-col>
      </v-row>
    </v-col>

    <!-- ПРАВАЯ ЧАСТЬ -->
    <v-col
      cols="12"
      sm="6"
    >
      <v-row>
        <v-col
          cols="12"
          sm="2"
        />

        <!-- ФИЛЬТР ПО ДАТЕ -->
        <v-col
          cols="12"
          sm="5"
        >
          <filters-date />
        </v-col>

        <!-- ПОИСК ПО НАЗВАНИЮ -->
        <v-col
          cols="12"
          sm="5"
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
import { mapGetters }   from 'vuex';

import accountsStatuses from '../../../constants/accounts/accounts-statuses';
import FiltersDate      from '../filters/AdsManagerFiltersDate';
import FiltersTags      from '../filters/AdsManagerFiltersTags';

export default {
  name: 'AccountsTopbar',

  components: {
    FiltersDate,
    FiltersTags
  },

  data() {
    return {
      nameSearchText: '',
      accountsStatuses,
    };
  },
  
  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      filters: 'accounts/FILTERS',
      tags: 'tags/tags',
    })
  },

  methods: {
    filterName(name) {
      this.nameSearchText = name;
      setTimeout(() => {
        if (name === this.nameSearchText) {
          this.$store.dispatch('accounts/setFiltersName', name);
        }  
      }, 500);
    },

    filterStatus(statuses) {
      this.$store.dispatch('accounts/setFiltersStatuses', statuses.map(status => status.value));
    }
  }
};
</script>

<style scoped></style>
