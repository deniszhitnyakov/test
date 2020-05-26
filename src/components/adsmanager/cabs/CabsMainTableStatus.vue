<template>
  <div class="my-3">
    <div v-if="cab.account.status === 'TOKEN_ERROR'">
      <v-chip
        dark
        color="red"
        outlined
        x-small
        label
      >
        TOKEN_ERROR
      </v-chip>
    </div>
    <div v-else-if="cab.account.status">
      <v-chip
        dark
        :color="statuses[cab.status][1]"
        outlined
        x-small
        label
      >
        {{ statuses[cab.status][0] }}
      </v-chip>
    </div>
    <div
      v-if="cab.status === 2"
      style="font-size: 9px; color:gray;"
    >
      <v-chip
        dark
        color="red"
        outlined
        x-small
        label
      >
        {{ disableReasons[cab.disable_reason][0] }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import disableReasons from '../../../constants/cabs/disable_reasons';
import statuses       from '../../../constants/cabs/statuses';

export default {
    name: 'CabsMainTableStatus',

    props: {
        cab: {
            type: Object,
            default: () => ({
                status: 1,
                disable_reason: 0,
            })
        }
    },

    data() {
        return {
            statuses,
            disableReasons,
        };
    },
};
</script>