<template>
  <v-btn
    small
    :disabled="accounts.selected.length === 0"
    color="primary"
    text
    style="min-width: 0; width: 30px; margin-top: 1px;"
    @click="multipleDelete"
  >
    <v-icon :size="12">
      fas fa-trash
    </v-icon>
  </v-btn>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
    name: 'AccountsMultipleDelete',

    computed: {
        ...mapGetters({
            accounts: 'accounts/ACCOUNTS',
        })
    },

    methods: {
        multipleDelete() {
            if (!confirm(this.$t('common.confirmPlease'))) return;
            this.$store.dispatch(
                'accounts/multipleDeleteAccounts', 
                this.accounts.selected.map(account => account.id)
            );
        }
    }
};
</script>