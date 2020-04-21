<template>
  <div>
    <v-chip
      class="mr-1"
      dark
      v-for="tag in account.tags"
      :key="`account-${account.id}-tag-${tag}`"
      color="primary"
      outlined
      x-small
      label
    >
      {{ tag }}
    </v-chip>
  </div>
</template>

<script>
    export default {
        name: 'AccountsMainTableTags',
        props: {
            account: {
                type: Object,
                default: () => ({})
            }
        }
    };
</script>