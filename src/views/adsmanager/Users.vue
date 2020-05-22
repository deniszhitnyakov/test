<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import MainTable from '../../components/adsmanager/users/UsersMainTable';
import Topbar    from '../../components/adsmanager/users/UsersTopbar';

export default {
  name: 'Users',

  components: {
    MainTable,
    Topbar
  },

  data() {
    return {
      updateInterval: null
    };
  },

  created() {
    this.$store.dispatch('users/loadUsers');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('users/loadUsers');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  },
};
</script>