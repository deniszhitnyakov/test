<template>
  <v-dialog
    :value="dialogs.add"
    persistent
    dark
    fullscreen
  >
    <v-card :loading="loading.addDialog">
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="$store.dispatch('accounts/closeDialog', 'add')"
        >
          <v-icon>fas fa-times</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('dialogs.accounts.singleAdd.title') }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            dark
            text
            :disabled="!validation.state"
            @click="addAccount"
          >
            {{ $t('common.add') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <dialog-form
          @change="newAccount = $event"
          @validation-changed="validation.state = $event"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';
    
import DialogForm   from './AccountsDialogForm';

export default {
  name: 'AccountsSingleAddDialog',

  components: {
    DialogForm
  },

  computed: {
    ...mapGetters({
      dialogs: 'accounts/dialogs',
      loading: 'accounts/loading',
    })
  },

  data() {
    return {
      validation: {
        state: false,
      },
      newAccount: {},
    };
  },

  methods: {
    addAccount() {
      this.$store.dispatch('accounts/addAccount', this.newAccount);
    }
  }
};
</script>