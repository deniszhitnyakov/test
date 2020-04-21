<template>
<div>
<v-card>
    <v-card-text>
      <v-btn
              fixed
              dark
              fab
              bottom
              right
              color="pink"
            >
              <v-icon style="margin-left: -80px;">mdi add</v-icon>
            </v-btn>
      <v-data-table
        :headers="cols"
        :items="accounts.filtered"
        show-expand
        :loading="tableLoading"
        :loading-text="$t('common.loading')"
      >
        <template v-slot:item.account="{ item }">
          <accounts-main-table-info :account="item"/>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon style="width: 20px;" class="mr-2" small :data-id="item.id">mdi delete</v-icon>
          <v-icon style="width: 20px;" small :data-id="item.id">mdi edit</v-icon>
          
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div>
              {{$t('common.dolphinId')}}: {{item.id}}
            </div>
            <accounts-main-table-facebook-profile :account="item"/>
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
    })
  },
  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      tableLoading: 'accounts/loading'
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
