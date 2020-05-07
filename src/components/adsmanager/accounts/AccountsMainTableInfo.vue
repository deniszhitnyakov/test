<template>
  <div class="my-2">
    <div>
      <span
        style="cursor: pointer;"
        @click="editAccount(account)"
      >
        {{ account.name }}
      </span>
    </div>
    <account-tags :account="account" />
  </div>
</template>

<script>
    import AccountTags                      from './AccountsMainTableTags';

    export default {
        name: 'AccountsMainTableInfo',

        components: {
            AccountTags,
        },

        props: {
            account: {
                type: Object,
                default: () => ({})
            }
        },

        methods: {
          editAccount(account) {
            this.$store.dispatch('accounts/initAccountForEdit', account);
          }
        }
    };
</script>