<template>
  <v-tabs
    centered
    grow
    :value="activeTab.tab"
    :height="32"
    @change="changeTab"
  >
    <v-tab key="tab-users">
      {{ $t('adsmanager.tabs.users') }}
    </v-tab>
    <v-tab key="tab-accounts">
      <v-badge
        color="red"
        inline
        tile
        :content="accounts.selected.length"
        :value="accounts.selected.length"
      >
        <template #badge>
          {{ accounts.selected.length }}
          <v-icon style="margin-top: -2px;">
            close
          </v-icon>
        </template>
        {{ $t('adsmanager.tabs.accounts') }}
      </v-badge>
    </v-tab>
    <v-tab key="tab-cabs">
      {{ $t('adsmanager.tabs.cabs') }}
    </v-tab>
    <v-tab key="tab-dates">
      {{ $t('adsmanager.tabs.dates') }}
    </v-tab>
    <v-tab key="tab-campaigns">
      {{ $t('adsmanager.tabs.campaigns') }}
    </v-tab>
    <v-tab key="tab-adsets">
      {{ $t('adsmanager.tabs.adsets') }}
    </v-tab>
    <v-tab key="tab-ads">
      {{ $t('adsmanager.tabs.ads') }}
    </v-tab>
  </v-tabs>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'AdsManagerTabs',

        computed: {
            ...mapGetters({
                activeTab: 'adsmanager/activeTab',
                accounts: 'accounts/ACCOUNTS'
            })
        },

        data: () => ({
            tabs: ['users', 'accounts', 'cabs', 'dates', 'campaigns', 'adsets', 'ads'],
        }),

        methods: {
            changeTab(tab) {
                this.$store.dispatch('adsmanager/setActiveTab', {
                    tab: tab,
                    component: this.tabs[tab]
                });
            }
        }
    };
</script>