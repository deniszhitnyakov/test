<template>
  <a-row style="margin-bottom: 16px;">
    <a-col
      style="text-align: left"
      :lg="{ span: 12 }"
    >
      <a-button-group>
        <a-tooltip title="Проверить токены">
          <a-button
            type="default"
            icon="api"
            :disabled="accounts.selected.length == 0"
          />
        </a-tooltip>
        <a-tooltip title="Назначить теги">
          <a-button
            type="default"
            icon="tag"
            :disabled="accounts.selected.length == 0"
          />
        </a-tooltip>
        <a-tooltip title="Поделиться аккаунтами">
          <a-button
            type="default"
            icon="share-alt"
            :disabled="accounts.selected.length == 0"
          />
        </a-tooltip>
        <a-tooltip title="Удалить">
          <a-button
            type="default"
            icon="delete"
            :disabled="accounts.selected.length == 0"
          />
        </a-tooltip>
      </a-button-group>
      <span style="margin-left: 8px;">
        Выбрано {{ accounts.selected.length }} элементов
      </span>
    </a-col>
    <a-col
      style="text-align: right"
      :lg="{ span: 12 }"
    >
      <a-input
        placeholder="Поиск по названию"
        style="width:80%; margin-right:8px;"
        allow-clear
        :value="filters.name"
        @input="
          $store.dispatch('accounts/SAVE_FILTERS_NAME', $event.target.value)
        "
      />
      <a-button 
        icon="sync"
        @click="$store.dispatch('accounts/LOAD_ACCOUNTS')" 
        class="mr-1"
      />
      <a-tooltip title="Добавить аккаунт">
        <a-button
          type="primary"
          icon="plus"
        />
      </a-tooltip>
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AccountsTopbar',
  computed: {
    ...mapGetters({
      accounts: 'accounts/ACCOUNTS',
      filters: 'accounts/FILTERS'
    })
  }
};
</script>

<style scoped></style>
