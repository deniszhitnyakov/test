<template>
  <div class="my-2">
    <div class="subtitle-1">
      {{ account.name }}
    </div>
    <accounts-main-table-actions :account="account" />
    <account-tags :account="account" />
  </div>
</template>

<script>
    import AccountsMainTableActions         from './AccountsMainTableActions';
    import AccountTags                      from './AccountsMainTableTags';

    export default {
        name: 'AccountsMainTableInfo',

        components: {
            AccountTags,
            AccountsMainTableActions
        },

        props: {
            account: {
                type: Object,
                default: () => ({})
            }
        }
    };
</script>