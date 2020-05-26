<template>
  <div class="my-2">
    <div>
      {{ cab.name }}
    </div>
    <div style="font-size: 11px; color: gray;">
      {{ $t('common.account') }}: {{ cab.account.name }}
    </div>
    <div>
      <cabs-main-table-tags :cab="cab" />
    </div>
  </div>
</template>

<script>
import CabsMainTableTags from './CabsMainTableTags';

export default {
    name: 'CabsMainTableInfo',

    components: {
        CabsMainTableTags
    },

    props: {
        cab: {
            type: Object,
            default: () => ({
                name: '',
            })
        }
    }
};
</script>