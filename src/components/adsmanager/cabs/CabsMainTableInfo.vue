<template>
  <div>
    <div>
      {{ cab.name }}
    </div>
    <div style="font-size: 11px; color: gray;">
      {{ $t('common.account') }}: {{ cab.account.name }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CabsMainTableInfo',

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