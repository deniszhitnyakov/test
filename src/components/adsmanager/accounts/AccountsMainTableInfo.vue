<template>
<div class="my-2">
    <div>
        {{account.name}}
    </div>
    <account-tags :account="account"/>
</div>
  
</template>

<script>
    import AccountTags from './AccountsMainTableTags';
    export default {
        name: 'AccountsMainTableInfo',

        components: {
            AccountTags
        },

        props: {
            account: {
                type: Object,
                default: () => ({})
            }
        }
    };
</script>