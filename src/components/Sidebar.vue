<template>
  <v-navigation-drawer
    expand-on-hover
    mini-variant
    fixed
  >
    <v-list
      nav
    >
      <v-list-item-group

        active-class="blue--text text--accent-4"
      >
        <v-list-item :to="{path: '/adsmanager'}">
          <v-list-item-icon>
            <v-icon>fab fa-facebook-square</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("sidebar.adsManager") }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>material-icons cloud_upload</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidebar.createAds") }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>material-icons comment</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidebar.comments") }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>material-icons shuffle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidebar.tracker") }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>material-icons access_alarm</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidebar.automationRules") }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>material-icons credit_card</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidebar.bankCards") }}</v-list-item-title>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>material-icons settings</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("sidebar.settings") }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
    export default {
        name: 'Sidebar'
    };
</script>