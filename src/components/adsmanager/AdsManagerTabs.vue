<template>
  <v-tabs
    centered
    grow
    :value="activeTab.tab"
    @change="changeTab"
  >
    <v-tab key="tab-users">
      {{ $t('adsmanager.tabs.users') }}
    </v-tab>
    <v-tab key="tab-accounts">
      {{ $t('adsmanager.tabs.accounts') }}
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
                activeTab: 'adsmanager/activeTab'
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