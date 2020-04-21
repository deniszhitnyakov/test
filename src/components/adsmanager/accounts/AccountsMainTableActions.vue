<template>
  <a-button-group>
    <a-tooltip title="Проверить токен">
      <a-button
        type="default"
        icon="api"
        @click="$store.dispatch('accounts/checkToken', account)"
      />
    </a-tooltip>
    <a-tooltip title="Изменить теги">
      <a-button
        type="default"
        icon="tag"
        @click="assignTags(account)"
      />
    </a-tooltip>
    <a-tooltip title="Поделиться аккаунтом">
      <a-button
        type="default"
        icon="share-alt"
        @click="shareAccount(account)"
      />
    </a-tooltip>
    <a-tooltip title="Редактировать">
      <a-button
        type="default"
        icon="edit"
      />
    </a-tooltip>
    <a-tooltip title="Удалить">
      <a-button
        type="default"
        icon="delete"
        @click="deleteAccount(account.id)"
      />
    </a-tooltip>
  </a-button-group>
</template>

<script>
    export default {
        name: 'AccountsMainTableStatus',
        props: {
            account: {
                type: Object,
                default: () => ({
                    id: -1,
                })
            }
        },
        methods: {
          deleteAccount(id) {
            if(confirm('Подверди плиз')) {
              this.$store.dispatch('accounts/DELETE_ACCOUNTS', [id]);
            }
          },
          
          assignTags(account) {
            this.$store.dispatch('accounts/setAccountForAssigningTags', account);
            this.$store.dispatch('accounts/openDialog', 'assignTags');
          },

          shareAccount(account) {
            this.$store.dispatch('accounts/initAccountForShare', account);
          }
        }
    };
</script>