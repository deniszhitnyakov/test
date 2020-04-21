<template>
  <div>
    <a-tag
      v-if="typeof colors[account.status] !== 'undefined'"
      :color="colors[account.status]"
    >
      {{ account.status }}
    </a-tag>
    <span v-if="typeof colors[account.status] === 'undefined'">
      {{ account.status }}
    </span>
  </div>
</template>

<script>
    import colors from '../../../constants/accounts/status-colors';

    export default {
        name: 'AccountsMainTableStatus',
        props: {
            account: {
                type: Object,
                default: () => ({
                    status: 'NEW',
                })
            }
        },
        data: () => ({
            colors
        })
    };
</script>