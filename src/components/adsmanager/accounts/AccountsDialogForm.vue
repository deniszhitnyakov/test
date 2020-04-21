<template>
  <v-form
    ref="form"
    v-model="validation.state"
  >
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <!-- НАЗВАНИЕ -->
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="newAccount.name"
              :label="$t('common.name')"
              :rules="validation.rules.name"
              required
            />
          </v-col>

          <!-- ТЕГИ -->
          <v-col
            cols="12"
          >
            <v-combobox
              v-model="newAccount.tags"
              :label="$t('common.tags')"
              :items="tags.all"
              multiple
              chips
              dark
              deletable-chips
            />
          </v-col>

          <!-- ACCESS_TOKEN -->
          <v-col cols="12">
            <v-textarea
              v-model="newAccount.access_token"
              label="Access token"
              :rules="validation.rules.access_token"
            />
          </v-col>
        </v-col>

        <!-- ПРАВЫЙ СТОЛБЕЦ -->
        <v-col
          cols="12"
          sm="6"
        >
          <!-- USEAGENT -->
          <v-col
            cols="12"
          >
            <v-switch
              v-model="show.useragent"
              :label="$t('common.useragent')"
            />

            <v-text-field
              v-if="show.useragent"
              v-model="newAccount.useragent"
              :label="$t('common.useragent')"
              :rules="validation.rules.useragent"
            />
          </v-col>

          <!-- ПРОКСИ -->
          <v-col
            cols="12"
          >
            <!-- ПОКАЗЫВАТЬ ПРОКСИ -->
            <v-switch
              v-model="show.proxy"
              :label="$t('common.proxy')"
            />
            <v-row v-if="show.proxy">
              <!-- СУЩЕСТВУЮЩИЙ ПРОКСИ -->
              <v-col
                cols="12"
              >
                <v-autocomplete
                  v-model="existingProxy"
                  :items="proxy.all"
                  :label="$t('common.existingProxy')"
                  :item-value="item => item.id"
                  :filter="searchExistingProxy"
                  clearable
                >
                  <template v-slot:item="{item}">
                    [{{ item.accounts_count }}]
                    {{ 
                      item.name !== null ?
                        item.name :
                        item.login === null ?
                          `${item.ip}:${item.port}` :
                          `${item.ip}:${item.port}:${item.login}:${item.password}`
                    }}
                  </template> 
                  <template v-slot:selection="{item}">
                    [{{ item.accounts_count }}]
                    {{ 
                      item.name !== null ?
                        item.name :
                        item.login === null ?
                          `${item.ip}:${item.port}` :
                          `${item.ip}:${item.port}:${item.login}:${item.password}`
                    }}
                  </template> 
                </v-autocomplete>
              </v-col>
              <!-- НАЗВАНИЕ ПРОКСИ -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="newAccount.proxy.name"
                  :label="$t('common.name')"
                />
              </v-col>
              <!-- ТИП ПРОКСИ -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  v-model="newAccount.proxy.type"
                  :label="$t('common.type')"
                  :items="proxy_types"
                  :rules="validation.rules.proxy"
                />
              </v-col>
              <!-- ХОСТ ПРОКСИ -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="newAccount.proxy.ip"
                  :label="$t('common.host')"
                  :rules="validation.rules.proxy"
                />
              </v-col>
              <!-- ПОРТ ПРОКСИ -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="newAccount.proxy.port"
                  :label="$t('common.port')"
                  :rules="validation.rules.proxy"
                />
              </v-col>
              <!-- ЛОГИН ПРОКСИ -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="newAccount.proxy.login"
                  :label="$t('common.login')"
                />
              </v-col>
              <!-- ПАРОЛЬ ПРОКСИ -->
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="newAccount.proxy.password"
                  :label="$t('common.password')"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
    import {mapGetters} from 'vuex';

    import proxy_types  from '../../../constants/proxy/proxy_types';

    export default {
        name: 'AccountsDialogForm',

        props: {
            edit: {
                type: Boolean,
                default: false,
            }
        },

        computed: {
            ...mapGetters({
                dialogs: 'accounts/dialogs',
                tags: 'tags/tags',
                proxy: 'proxy/proxy'
            })
        },

        data: function() {
            return ({
                proxy_types,
                validation: {
                    state: false,
                    rules: {
                        name: [
                            v => !!v || this.$t('common.required').toLowerCase()
                        ],
                        access_token: [
                            v => !!v || this.$t('common.required').toLowerCase()
                        ],
                        proxy: [
                            (v) => {
                                    if (v.length === 0 && this.show.proxy) return this.$t('common.required').toLowerCase();
                                    return true;
                                } 
                        ],
                        useragent: [
                            (v) => {
                                if (v.length === 0 && this.show.useragent) return this.$t('common.required').toLowerCase();
                                return true;
                            } 
                        ]
                    }
                },
                existingProxy: {},
                newAccount: {
                    name: '',
                    tags: [],
                    access_token: '',
                    useragent: '',
                    proxy: {
                        name: '',
                        type: '',
                        host: '',
                        port: '',
                        login: '',
                        password: '',
                    }
                },
                show: {
                    useragent: false,
                    proxy: false,
                }
            });
        },

        watch: {
            'show.useragent': function() {
                if (this.show.useragent === false) this.newAccount.useragent = '';
            },

            'show.proxy': function() {
                if (this.show.useragent === false) {
                    this.newAccount.proxy = {
                        name: '',
                        type: '',
                        ip: '',
                        port: '',
                        login: '',
                        password: '',
                    };
                }
            },

            existingProxy: function() {
                const proxy = this.proxy.all.find(p => p.id === this.existingProxy);
                if (typeof proxy === 'undefined') {
                    this.newAccount.proxy = {
                        name: '',
                        type: '',
                        ip: '',
                        port: '',
                        login: '',
                        password: '',
                    };
                } else {
                    this.newAccount.proxy = {...proxy};
                }
                
            },

            newAccount: {
                deep: true,
                handler() {
                    this.$emit('change', this.newAccount);
                }
            },

            'validation.state': function() {
                this.$emit('validation-changed', this.validation.state);
            }
        },

        created() {
            this.$store.dispatch('tags/loadTags');
            this.$store.dispatch('proxy/loadProxy');
        },

        methods: {
            searchExistingProxy(item, queryText) {
                const q = queryText.toLowerCase();
                if (item.name && item.name.toString().toLowerCase().search(q) !== -1) return true;
                if (item.ip && item.ip.toString().toLowerCase().search(q) !== -1) return true;
                if (item.port && item.port.toString().toLowerCase().search(q) !== -1) return true;
                if (item.login && item.login.toString().toLowerCase().search(q) !== -1) return true;
                if (item.password && item.password.toString().toLowerCase().search(q) !== -1) return true;

                return false;
            }
        }
    };
</script>