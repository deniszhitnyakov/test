<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0px 8px 0px 8px">
        <v-btn
          fixed
          dark
          fab
          top
          right
          color="pink"
          x-small
          style="top: 23px;"
          @click="$store.dispatch('accounts/openDialog', 'add')"
        >
          <v-icon>
            fas fa-plus
          </v-icon>
        </v-btn>
        <v-data-table
          v-model="selected"
          :headers="cols"
          :items="accounts.filtered"
          show-expand
          :loading="loading.mainTable"
          :loading-text="$t('common.loading')"
          fixed-header
          :items-per-page="10"
          :height="innerHeight - 50"
          show-select
          :rows-per-page-items="[20, 10, 30, 40]"
          disable-pagination
          hide-default-footer
        >
          <template v-slot:item.account="{ item }">
            <accounts-main-table-info :account="item" />
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon
              style="width: 20px;"
              class="mr-2"
              small
              :data-id="item.id"
            >
              mdi delete
            </v-icon>
            <v-icon
              style="width: 20px;"
              small
              :data-id="item.id"
            >
              mdi edit
            </v-icon>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div>
                {{ $t('common.dolphinId') }}: {{ item.id }}
              </div>
              <accounts-main-table-facebook-profile :account="item" />
            </td>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters }                   from 'vuex';

// import AccountsMainTableActions         from './AccountsMainTableActions';
import AccountsMainTableFacebookProfile from './AccountsMainTableFacebookProfile';
// import AccountsMainTableStatus          from './AccountsMainTableStatus';
// import AccountsMainTableTags            from './AccountsMainTableTags';
import AccountsMainTableInfo            from './AccountsMainTableInfo';

export default {
  components: {
    AccountsMainTableFacebookProfile,
    // AccountsMainTableStatus,
    // AccountsMainTableActions,
    // AccountsMainTableTags,
    AccountsMainTableInfo
  },
  data: function() {
    return ({
      selected: [],
      cols: [
        {
            text: this.$t('common.account'),
            value: 'account',
            sortDirections: [ 'descend', 'ascend' ],
            width: 200,
        },
        {
            value: 'actions',
            align: 'right',
            sortable: false
        },
        { text: '', value: 'data-table-expand', align: 'right' },
      ]
    });
  },

  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      loading: 'accounts/loading',
      innerHeight: 'main/innerHeight'
    }),
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          this.$store.dispatch('accounts/SAVE_SELECTED_ACCOUNTS', selectedRows);
        }
      };
    }
  }
};
</script>
