<template>
  <div>
    <!-- ДИАЛОГИ -->
    <single-add-dialog v-if="dialogs.add" />
    <edit-dialog v-if="dialogs.edit" />
    <multiple-share-dialog v-if="dialogs.multipleShare" />
    <multiple-assign-tags-dialog v-if="dialogs.multipleAssignTags" />
    <assign-tags-dialog v-if="dialogs.assignTags" />
    <share-dialog v-if="dialogs.share" />

    <!-- TOPBAR -->
    <topbar />

    <!-- ТАБЛИЦА -->
    <main-table />
  </div>
</template>

<script>
import {mapGetters}                         from 'vuex';

import AssignTagsDialog                     from '../../components/adsmanager/accounts/AccountsAssignTagsDialog';
import EditDialog                           from '../../components/adsmanager/accounts/AccountsEditDialog';
import MainTable                            from '../../components/adsmanager/accounts/AccountsMainTable';
import MultipleAssignTagsDialog             from '../../components/adsmanager/accounts/AccountsMultipleAssignTagsDialog';
import MultipleShareDialog                  from '../../components/adsmanager/accounts/AccountsMultipleShareDialog';
import ShareDialog                          from '../../components/adsmanager/accounts/AccountsShareDialog';
import SingleAddDialog                      from '../../components/adsmanager/accounts/AccountsSingleAddDialog';
import Topbar                               from '../../components/adsmanager/accounts/AccountsTopbar';

export default {
    name: 'Accounts',
  
    components: {
        Topbar,
        MainTable,
        AssignTagsDialog,
        ShareDialog,
        SingleAddDialog,
        EditDialog,
        MultipleShareDialog,
        MultipleAssignTagsDialog
    },

    data() {
        return {
            updateStatInterval: 0,
        };
    },
  
    computed: {
        ...mapGetters({
            dialogs: 'accounts/dialogs',
            globalFilters: 'adsmanager/filters',
            accounts: 'accounts/accounts'
        })
    },

    watch: {
        globalFilters: {
            deep: true,
            async handler() {
                await this.$store.dispatch('accounts/filterAccounts');
                this.$store.dispatch('accounts/loadStat');
            }
        },

        'accounts.selected': {
            deep: true,
            handler(newVal, oldVal) {
                if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
                    this.$store.dispatch('cabs/clear');
                    this.$store.dispatch('campaigns/clear');
                    this.$store.dispatch('adsets/clear');
                    this.$store.dispatch('ads/clear');
                }
            }
        }
    },
  
    created() {
        this.$store.dispatch('accounts/LOAD_ACCOUNTS');
        this.$store.dispatch('users/loadUsers');
        this.updateStatInterval = setInterval( () => {
            this.$store.dispatch('accounts/LOAD_ACCOUNTS');
            this.$store.dispatch('users/loadUsers');
        }, 60000 );
    },

    mounted() {
        this.$store.dispatch('accounts/filterAccounts');
    },

    beforeDestroy() {
        clearInterval(this.updateStatInterval);
    },
};
</script>