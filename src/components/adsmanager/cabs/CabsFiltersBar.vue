<template>
  <v-navigation-drawer
    :value="show"
    temporary
    right
    absolute
    dark
    style="z-index: 9999; width: 400px;"
    @transitionend="$emit('close')"
  >
    <div style="padding: 16px">
      <div class="mb-3">
        <span>
          <v-btn
            color="grey"
            fab
            x-small
            outlined
            dark
            class="sidebar-collapse-button"
            @click="$emit('close')"
          >
            <v-icon>keyboard_arrow_right</v-icon>
          </v-btn>
        </span>
        <span class="title">
          {{ $t('common.filters') }}
        </span>
      </div>
      
      <v-row>
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <!-- ФИЛЬТР АККАУНТУ -->
          <v-combobox
            :label="$t('filters.accountStatus')"
            :items="accountsStatuses"
            :value="filters.accountsStatuses"
            multiple
            chips
            dark
            deletable-chips
            clearable
            dense
            small-chips
            solo
            prepend-inner-icon="fas fa-code"
            hide-details
            @change="filterAccountsStatuses"
          /> 
        </v-col>
        
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <!-- ФИЛЬТР ПО БМ -->
          <v-combobox
            :label="$t('filters.cabStatus')"
            :items="cabsStatuses"
            :item-value="item => item.text"
            :value="filters.cabsStatuses"
            multiple
            chips
            dark
            deletable-chips
            clearable
            dense
            small-chips
            solo
            prepend-inner-icon="fas fa-code"
            hide-details
            @change="filterCabsStatuses"
          />
        </v-col>
        
        <v-col>
          <v-divider />
        </v-col>

        <v-col
          cols="12"
          class="py-0"
        >
          <!-- ФИЛЬТР ПО СТАТУСУ АККАУНТА -->
          <v-combobox
            :label="$t('filters.accountStatus')"
            :items="accountsStatuses"
            :value="filters.accountsStatuses"
            multiple
            chips
            dark
            deletable-chips
            clearable
            dense
            small-chips
            solo
            prepend-inner-icon="fas fa-code"
            hide-details
            @change="filterAccountsStatuses"
          /> 
        </v-col>
        
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <!-- ФИЛЬТР ПО СТАТУСУ КАБИНЕТА -->
          <v-combobox
            :label="$t('filters.cabStatus')"
            :items="cabsStatuses"
            :item-value="item => item.text"
            :value="filters.cabsStatuses"
            multiple
            chips
            dark
            deletable-chips
            clearable
            dense
            small-chips
            solo
            prepend-inner-icon="fas fa-code"
            hide-details
            @change="filterCabsStatuses"
          />
        </v-col>
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <filters-tags @filtered="$store.dispatch('accounts/clearSelected')" />
        </v-col>
        
        <v-col>
          <v-divider />
        </v-col>
        
        <!-- ФИЛЬТР ПО ТИПУ КАБИНЕТА -->
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <h5>
            {{ $t('adsmanager.cabs.filters.cabType') }}
          </h5>
          <v-radio-group
            :mandatory="false"
            :value="filters.type"
            row
            @change="$store.dispatch('cabs/setSpecificFilter', {filter: 'type', data: $event});"
          >
            <v-radio
              :label="$t('adsmanager.cabs.filters.cabTypes.all')"
              value="all"
            />
            <v-radio
              :label="$t('adsmanager.cabs.filters.cabTypes.business')"
              value="business"
            />
            <v-radio
              :label="$t('adsmanager.cabs.filters.cabTypes.personal')"
              value="personal"
            />
          </v-radio-group>
        </v-col>

        <!-- <v-col>
          <v-divider />
        </v-col> -->

        <!-- ФИЛЬТР ПО НАЛИЧИЮ КАРТЫ -->
        <v-col
          cols="12"
          class="py-0 mt-2"
        >
          <h5>
            {{ $t('adsmanager.cabs.filters.attachedCard') }}
          </h5>
          <v-radio-group
            row
            :mandatory="false"
            :value="filters.attachedCard"
            @change="$store.dispatch('cabs/setSpecificFilter', {filter: 'attachedCard', data: $event});"
          >
            <v-radio
              :label="$t('common.all')"
              value="all"
            />
            <v-radio
              :label="$t('adsmanager.cabs.filters.attachedCardRadios.yes')"
              value="with-card"
            />
            <v-radio
              :label="$t('adsmanager.cabs.filters.attachedCardRadios.no')"
              value="without-card"
            />
          </v-radio-group>
        </v-col>
      </v-row>

      <!-- ФИЛЬТР ПО ТЕГАМ -->
    </div>
  </v-navigation-drawer>
</template>

<script>
    import { mapGetters }       from 'vuex';

    import accountsStatuses     from '../../../constants/accounts/accounts-statuses';    
    import cabsStatuses         from '../../../constants/cabs/statuses_for_select';    
    import FiltersTags          from '../filters/AdsManagerFiltersTags';

    export default {
        name: 'CabsFiltersBar',

        components: {
            FiltersTags,
        },

        props: {
            show: {
                type: Boolean,
                default: false,
            }
        },

        data() {
            return {
                accountsStatuses,
                cabsStatuses
            };
        },

        computed: {
            ...mapGetters({
                cabs: 'cabs/cabs',
                filters: 'cabs/filters',
                tags: 'tags/tags',
            })
        },

        methods: {
            async filterAccountsStatuses(statuses) {
                if (statuses && statuses.length > 0) {
                  this.$store.dispatch('cabs/clearSelected');
                  statuses = statuses.map(status => {
                      if (typeof status.value !== 'undefined') return status.value;
                  });
                } else {
                  statuses = [];
                }
                await this.$store.dispatch('cabs/setSpecificFilter', {
                  filter: 'accountsStatuses',
                  data: statuses
                });
            },

            async filterCabsStatuses(statuses) {
              console.log(statuses);
              if (statuses && statuses.length > 0) {
                this.$store.dispatch('cabs/clearSelected');
              }
              const data = {
                filter: 'cabsStatuses',
                data: statuses
              };
              await this.$store.dispatch('cabs/setSpecificFilter', data);
            }
        }
    };
</script>
<style></style>