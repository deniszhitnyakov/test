<template>
  <div>
    <topbar />
    <main-table />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'; 

import MainTable    from '../../components/adsmanager/users/UsersMainTable';
import Topbar       from '../../components/adsmanager/users/UsersTopbar';

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

  computed: {
    ...mapGetters({
      users: 'users/users'
    })
  },

  watch: {
    'users.selected': {
      deep: true,
      handler() {
        this.$store.dispatch('accounts/clearSelected');
        this.$store.dispatch('cabs/clearSelected');
      }
    }
  },

  created() {
    this.$store.dispatch('users/loadUsers');
    this.updateInterval = setInterval(() => {
      this.$store.dispatch('users/loadUsers');
    }, 60000);
  },

  beforeDestroy() {
    clearInterval(this.updateInterval);
  }
};
</script>