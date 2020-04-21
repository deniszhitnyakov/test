<template>
  <v-app>
    <topbar />
    <sidebar />

    <v-content style="padding-left: 56px; padding-top: 24px; height: 100vh;">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import Sidebar from './components/Sidebar';
import Topbar  from './components/topbar/Topbar';

export default {
  name: 'App',

  components: {
    Topbar,
    Sidebar,
  },
};
</script>
