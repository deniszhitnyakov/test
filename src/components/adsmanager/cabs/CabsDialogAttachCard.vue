<template>
  <v-dialog
    :value="dialogs.attachCard"
    max-width="500px"
    scrollable
    persistent
  >
    <v-card :loading="false">
      <v-card-title>
        <span class="headline">
          {{ $t('dialogs.cabs.attachCard.title') }}
        </span>
      </v-card-title>
      <v-card-text style="max-height: 700px;">
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              attach card
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          text
          @click="$store.dispatch('cab/closeDialog', 'attachCard')"
        >
          {{ $t('common.close') }}
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
        >
          {{ $t('common.attach') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'AccountsShareDialog',

  data() {
    return {
      card: {
        number: '',
        cvc: '',
        expire1: '',
        expire2: '',
      }
    };
  },

  computed: {
    ...mapGetters({
      dialogs: 'cabs/dialogs'
    })
  },
        
  created() {
  },
        
  methods: {
  }
};
</script>