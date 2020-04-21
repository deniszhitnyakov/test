<template>
  <a-drawer
    placement="right"
    :closable="true"
    :visible="true"
    width="350"
    @close="closeDialog"
  >
    <template slot="title">
      Раздача прав на аккаунт
      <a-tag color="blue">
        {{ account.name }}
      </a-tag>
    </template>

    <a-tree
      v-model="newAccount.permissions"
      checkable
      :show-line="false"
      :show-icon="false"
      :default-expand-all="true"
      style="padding-bottom: 50px;"
    >
      <a-tree-node
        v-for="user in users"
        :key="`permissions-for-user-${user.id}`"
      >
        <template slot="title">
          <a-icon type="user" />
          {{ user.display_name ? user.display_name : user.login }}
        </template>
        
        <a-tree-node
          :key="`${user.id}-read`"
        >
          <span slot="title">
            <a-icon type="eye" /> 
            Просмотр
          </span>
        </a-tree-node>
        
        <a-tree-node
          :key="`${user.id}-edit`"
        >
          <span slot="title">
            <a-icon type="edit" /> 
            Редактирование
          </span>
        </a-tree-node>

        <a-tree-node
          :key="`${user.id}-stat`"
        >
          <span slot="title">
            <a-icon type="bar-chart" /> 
            Статистика
          </span>
        </a-tree-node>

        <a-tree-node
          :key="`${user.id}-share`"
        >
          <span slot="title">
            <a-icon type="share-alt" /> 
            Раздавать
          </span>
        </a-tree-node>
      </a-tree-node>
    </a-tree>

    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button
        :style="{ marginRight: '8px' }"
        @click="closeDialog"
      >
        Отмена
      </a-button>
      <a-button
        type="primary"
        :disabled="JSON.stringify(account.permissions) === JSON.stringify(newAccount.permissions)"
        @click="savePermissions"
      >
        Сохранить
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'AccountsShareDialog',
        computed: {
            ...mapGetters({
                account: 'accounts/forShare',
                users: 'users/allUsers',
            }),
        },
        data: () => ({
            newAccount: {},
        }),
        created() {
            this.newAccount = {...this.account};
        },
        methods: {
            closeDialog() {
                if (JSON.stringify(this.account.permissions) === JSON.stringify(this.newAccount.permissions)) {
                    this.$store.dispatch('accounts/closeDialog', 'share');
                } else {
                    if (confirm('Отменить изменения?')) {
                        this.$store.dispatch('accounts/closeDialog', 'share');
                    }
                }
            },

            async savePermissions() {
                const success = await this.$store.dispatch('accounts/savePermissions', this.newAccount);
                if (success) {
                    this.$store.dispatch('accounts/closeDialog', 'share');
                }
            }
        }
    };
</script>