<template>
  <a-drawer
    placement="right"
    :closable="true"
    :visible="true"
    width="500"
    @close="$store.dispatch('accounts/closeDialog', 'assignTags')"
  >
    <template slot="title">
      Назначение тегов аккаунту
      <a-tag color="blue">
        {{ account.name }}
      </a-tag>
    </template>

    <div class="my-1">
      <div class="text-small">
        <strong>
          Теги
        </strong>
      </div>
      <div>
        <a-select
          v-model="newAccount.tags"
          mode="tags"
          class="w-100"
        >
          <a-select-option
            v-for="tag in tags.all"
            :key="`tag-${tag}`"
            :value="tag"
          >
            {{ tag }}
          </a-select-option>
        </a-select>
      </div>
    </div>

    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button
        :style="{ marginRight: '8px' }"
        @click="$store.dispatch('accounts/closeDialog', 'assignTags')"
      >
        Отмена
      </a-button>
      <a-button
        type="primary"
        :disabled="JSON.stringify(account.tags) === JSON.stringify(newAccount.tags)"
        @click="saveTags"
      >
        Сохранить
      </a-button>
    </div>
  </a-drawer>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'AccountsAssignTagsDialog',
        computed: {
            ...mapGetters({
                tags: 'tags/tags',
                account: 'accounts/accountForAssigningTags'
            })
        },
        data: () => (
            {
                newAccount: {
                    name: '',
                }
            }
        ),
        created() {
            this.newAccount = {...this.account};
            this.$store.dispatch('tags/loadTags');
        },
        methods: {
            async saveTags() {
                const success = await this.$store.dispatch('accounts/saveTags', this.newAccount);
                if (success) {
                    this.$store.dispatch('accounts/closeDialog', 'assignTags');
                }
            }
        }
    };
</script>