<template>
  <v-app>
    <topbar v-show="false" />
    <sidebar />
    <api-error v-if="dialogs.apiError" />

    <v-content style="padding-left: 56px; padding-top: 0px; max-height: 100%;">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';

import ApiError     from './components/ApiError';
import Sidebar      from './components/Sidebar';
import Topbar       from './components/topbar/Topbar';

export default {
  name: 'App',

  components: {
    Topbar,
    Sidebar,
    ApiError
  },

  computed: {
    ...mapGetters({
      dialogs: 'main/dialogs'
    })
  },

  created() {
    this.$store.dispatch('main/setInnerHeight', window.innerHeight);
    window.addEventListener('resize', (data) => {
        this.$store.dispatch('main/setInnerHeight', data.target.innerHeight);
    });
  }
};
</script>
<style>
  body {
    height: 100vh;
    overflow: hidden !important;
  }

  body::-webkit-scrollbar {
    display: none;
  }

  .v-data-table__wrapper::-webkit-scrollbar {
    display: none;
  }

  .v-dialog--fullscreen .v-card__progress {
    height: 4px;
    margin-top: 64px;
    position: fixed;
  }

  .v-data-footer {
    display: flex;
    align-items: center;
    justify-content: center !important;
  }

  .v-tabs-slider-wrapper {
    height: 1px !important;
  }
</style>