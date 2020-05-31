<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="400"
  >
    <v-card>
      <v-card-title class="headline">
        {{ $t('proxy.changeName') }}
      </v-card-title>
      <v-text-field
        v-model="proxy.name"
        :label="$t('common.name')"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="green darken-1"
          text
          @click="handleModalSave"
        >
          {{ $t('common.save') }}
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="handleModalClose"
        >
          {{ $t('common.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapGetters}                                               from 'vuex';

export default {
    computed: {
        ...mapGetters({
            dialog: 'modal/modal',
            proxy: 'proxy/proxyModifiers'
        })
    },
    methods: {
        handleModalSave() {
            this.$store.dispatch('proxy/saveNewName', {id: this.proxy.id, name: this.proxy.name});
        },
        handleModalClose() {
            this.$store.dispatch('modal/toggleModal');
        }
    }
};
</script>

<style scoped>
.v-input {
    max-width: 80%;
    margin-top: 1rem;
    margin-left: 1.8rem;
}
</style>