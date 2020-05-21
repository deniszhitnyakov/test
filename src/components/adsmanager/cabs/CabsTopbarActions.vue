<template>
  <div style="float: left;">
    <!-- УПРАВЛЯТЬ ТЕГАМИ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          :disabled="cabs.selected.length === 0"
          v-on="on"
          @click="$store.dispatch('cabs/openDialog', 'tags')"
        >
          <v-icon :size="12">
            fas fa-tags
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.manageTags') }}</span>
    </v-tooltip>

    <!-- ПОДЕЛИТЬСЯ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="cabs.selected.length === 0"
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          v-on="on"
          @click="$store.dispatch('cabs/openDialog', 'share')"
        >
          <v-icon :size="12">
            fas fa-share-alt
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.share') }}</span>
    </v-tooltip>

    <!-- АРХИВИРОВАТЬ -->
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="cabs.selected.length === 0"
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          v-on="on"
        >
          <v-icon :size="12">
            fas fa-archive
          </v-icon>
        </v-btn>
      </template>
      <span>{{ $t('common.archive') }}</span>
    </v-tooltip>

    <!-- ПРОЧИЕ ДЕЙСТВИЯ -->
    <v-menu
      offset-y
      open-on-hover
      close-on-click
    >
      <template v-slot:activator="{ on }">
        <v-btn
          :disabled="cabs.selected.length === 0"
          small
          color="primary"
          text
          style="min-width: 0; width: 30px; margin-top: 1px;"
          v-on="on"
        >
          <v-icon :size="12">
            fas fa-ellipsis-v
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          dense
          @click="$store.dispatch('cabs/openDialog', 'attachCard')"
        >
          <v-list-item-title>{{ $t('adsmanager.cabs.actions.attachBankCard') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          dense
          @click="alert('1111')"
        >
          <v-list-item-title>{{ $t('adsmanager.cabs.actions.changeBillingCountry') }}</v-list-item-title>
        </v-list-item>

        <v-divider inset />

        <v-list-item
          dense
          @click="alert('1111')"
        >
          <v-list-item-title>{{ $t('common.rename') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          dense
          @click="alert('1111')"
        >
          <v-list-item-title>{{ $t('adsmanager.cabs.actions.createPixel') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          dense
          @click="alert('1111')"
        >
          <v-list-item-title>{{ $t('adsmanager.cabs.actions.turnOffNotifications') }}</v-list-item-title>
        </v-list-item>

        <v-divider inset />

        <v-list-item
          dense
          @click="alert('1111')"
        >
          <v-list-item-title>{{ $t('adsmanager.cabs.actions.applyAutomationRule') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          dense
          @click="alert('1111')"
        >
          <v-list-item-title>{{ $t('adsmanager.cabs.actions.applyAutomationRulesGroup') }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          dense
          @click="alert('1111')"
        >
          <v-list-item-title>{{ $t('adsmanager.cabs.actions.clearAllAutomationRules') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- СЧЕТЧИК -->
    <span
      class="body-2 ml-1"
      :style="{color: cabs.selected.length > 0 ? '' : 'gray'}"
    >
      {{ $t('common.selected') }} : {{ cabs.selected.length }}
    </span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'CabsTopbarActions',

  computed: {
    ...mapGetters({
      cabs: 'cabs/cabs'
    })
  }
};
</script>