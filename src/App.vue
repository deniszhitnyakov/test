<template>
  <v-app>
    <topbar v-show="false" />
    <sidebar />
    <api-error v-if="dialogs.apiError" />
    <alert />

    <v-content style="padding-left: 56px; padding-top: 0px; max-height: 100%;">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import {mapGetters} from 'vuex';

import Alert        from './components/Alert';
import ApiError     from './components/ApiError';
import Sidebar      from './components/Sidebar';
import Topbar       from './components/topbar/Topbar';

export default {
  name: 'App',

  components: {
    Alert,
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

    this.$store.dispatch('main/loadProfile');
    setInterval(() => {
      this.$store.dispatch('main/loadProfile');
    }, 60000);
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

  /* .v-data-table__wrapper::-webkit-scrollbar {
    display: none;
  } */

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

  .theme--dark.v-data-table tbody tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: #2a2a2a !important;
  }

  .v-data-table td, .v-data-table th {
    padding: 0px !important;
  }

  .v-data-table__checkbox {
    padding: 0 8px;
  }

  .v-input__icon > i.v-icon {
    font-size: 12px !important;
  }

  .topbar-row > div.col-12 {
    padding: 0px 16px 0px 16px;
  }
  .topbar-row > div.col-12 > div.row > div[class^="col-"] {
    padding: 0px 8px 8px 8px;
  }

  .stat-digits {
    font-size: 16px;
    /* font-family: monospace; */
  }

  .stat-table tr:last-child {
    font-weight: bold !important;
  }

  .vue-daterange-picker input[type=text], .topbar-row input[type=text] {
    cursor: pointer;
  }

  .v-text-field.v-text-field--solo.v-input--dense > .v-input__control {
    min-height: 30px !important;
  }

  .v-text-field.v-text-field--solo.v-input--dense input[type=text], .topbar-row .v-label {
    font-size: 12px !important;
  }

  .sidebar-collapse-button {
    width: 24px !important;
    height: 24px !important;
    margin-top: -5px;
    margin-right: 8px;
  }

  table > tbody > tr > td:nth-child(1), 
  table > thead > tr > th:nth-child(1) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 0; 
    z-index: 3;
    background: #1e1e1e;
  }

  table > tbody > tr > td:nth-child(2), 
  table > thead > tr > th:nth-child(2) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 40px; 
    z-index: 3;
    background: #1e1e1e;
  }

  table > tbody > tr > td:nth-child(3), 
  table > thead > tr > th:nth-child(3) {
    position: sticky !important; 
    position: -webkit-sticky !important; 
    left: 190px; 
    z-index: 3;
    background: #1e1e1e;
  }

  table > tbody > tr:hover > td:nth-child(1), 
  table > thead > tr:hover > th:nth-child(1),
  table > tbody > tr:hover > td:nth-child(2), 
  table > thead > tr:hover > th:nth-child(2),
  table > tbody > tr:hover > td:nth-child(3), 
  table > thead > tr:hover > th:nth-child(3) {
    background: #2a2a2a;
  }
</style>