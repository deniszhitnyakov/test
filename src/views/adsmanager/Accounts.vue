<template>
  <div>
    <!-- ДИАЛОГИ -->
    <single-add-dialog v-if="dialogs.add" />
    <edit-dialog v-if="dialogs.edit" />
    <assign-tags-dialog 
      v-if="dialogs.assignTags"
    />
    <share-dialog 
      v-if="dialogs.share"
    />

    <!-- TOPBAR -->
    <topbar />

    <!-- ТАБЛИЦА -->
    <main-table />
  </div>
</template>

<script>
import {mapGetters}         from 'vuex';

import AssignTagsDialog     from '../../components/adsmanager/accounts/AccountsAssignTagsDialog';
import EditDialog           from '../../components/adsmanager/accounts/AccountsEditDialog';
import MainTable            from '../../components/adsmanager/accounts/AccountsMainTable';
import ShareDialog          from '../../components/adsmanager/accounts/AccountsShareDialog';
import SingleAddDialog      from '../../components/adsmanager/accounts/AccountsSingleAddDialog';
import Topbar               from '../../components/adsmanager/accounts/AccountsTopbar';

export default {
  name: 'Accounts',
  
  components: {
    Topbar,
    MainTable,
    AssignTagsDialog,
    ShareDialog,
    SingleAddDialog,
    EditDialog,
  },
  
  computed: {
    ...mapGetters({
      dialogs: 'accounts/dialogs',
      globalFilters: 'adsmanager/filters'
    })
  },

  watch: {
    globalFilters: {
      deep: true,
      async handler() {
        await this.$store.dispatch('accounts/filterAccounts');
        this.$store.dispatch('accounts/loadStat');
      }
    }
  },
  
  created() {
    this.$store.dispatch('accounts/LOAD_ACCOUNTS');
    this.$store.dispatch('users/loadUsers');
    setInterval( () => {
      this.$store.dispatch('accounts/LOAD_ACCOUNTS');
      this.$store.dispatch('users/loadUsers');
    }, 60000 );
  },

  mounted() {
    this.$store.dispatch('accounts/filterAccounts');
  }
};
</script>