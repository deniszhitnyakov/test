<template>
  <div>
    <!-- <topbar /> -->
    <main-table />
    <assign-tags-dialog 
      v-if="dialogs.assignTags"
    />
    <share-dialog 
      v-if="dialogs.share"
    />
  </div>
</template>

<script>
import {mapGetters}     from 'vuex';

// import Topbar           from '../../components/adsmanager/accounts/AccountTopbar';
import AssignTagsDialog from '../../components/adsmanager/accounts/AccountsAssignTagsDialog';
import MainTable        from '../../components/adsmanager/accounts/AccountsMainTable';
import ShareDialog      from '../../components/adsmanager/accounts/AccountsShareDialog';

export default {
  name: 'Accounts',
  components: {
    // Topbar,
    MainTable,
    AssignTagsDialog,
    ShareDialog
  },
  computed: {
    ...mapGetters({
      dialogs: 'accounts/dialogs'
    })
  },
  created() {
    this.$store.dispatch('accounts/LOAD_ACCOUNTS');
    this.$store.dispatch('users/loadUsers');
    setInterval( () => {
      this.$store.dispatch('accounts/LOAD_ACCOUNTS');
      this.$store.dispatch('users/loadUsers');
    }, 60000 );
  },
};
</script>