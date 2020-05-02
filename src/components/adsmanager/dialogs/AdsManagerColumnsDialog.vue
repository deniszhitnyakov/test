<template>
  <v-dialog
    :value="dialogs.columns"
    persistent
    dark
    fullscreen
  >
    <v-card :loading="loading.columnsDialog">
      <v-toolbar
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="$store.dispatch('adsmanager/closeDialog', 'columns')"
        >
          <v-icon>fas fa-times</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('common.columns') }}</v-toolbar-title>
        <v-spacer />
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="saveCols"
          >
            {{ $t('common.save') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text :loading="loading.columns">
        <v-row>
          <v-col
            cols="4"
            offset="2"
          >
            <div class="mb-3">
              <v-text-field
                dense
                clearable
                :label="$t('common.search')"
                single-line
                prepend-inner-icon="fas fa-search"
                hide-details
                @input="searchLeftCols"
              />
            </div>
            <div class="cols-container">
              <draggable
                :value="cols.filtered"
                class="dragArea list-group"
                :group="{ name: 'selectedCols', pull: 'clone', put: false }"
                :move="onMove"
              >
                <v-card
                  v-for="col in cols.filtered"
                  :key="`columns-dialog-${col}-left`"
                  outlined
                  class="my-3"
                  :color="selectedCols.all.indexOf(col) === -1 ? '' : 'primary'"
                >
                  <v-card-text
                    style="cursor: move; padding: 8px 8px 8px 16px;"
                  >
                    <span class="title">
                      <v-icon>drag_handle</v-icon>
                      {{ $t(`adsmanager.cols.${col}`) }}
                    </span>
                  </v-card-text>
                </v-card>
              </draggable>
            </div>
          </v-col>

          <v-col
            cols="4"
          >
            <div class="mb-3">
              <v-text-field
                v-model="search"
                dense
                clearable
                :label="$t('common.search')"
                single-line
                prepend-inner-icon="fas fa-search"
                hide-details
              />
            </div>
            <div class="cols-container">
              <draggable
                :list="selectedCols.all"
                group="selectedCols"
              >
                <v-card
                  v-for="col in selectedCols.filtered"
                  :key="`columns-dialog-${col}-right`"
                  outlined
                  class="my-3 list-group-item"
                >
                  <v-card-text
                    style="cursor: move; padding: 8px 8px 8px 16px;"
                  >
                    <div style="display: flex; justify-content: space-between;">
                      <div>
                        <span class="title">
                          <v-icon>drag_handle</v-icon>
                          {{ $t(`adsmanager.cols.${col}`) }}
                        </span>
                      </div>
                      <div style="display: flex; align-items: center;">
                        <v-btn
                          text
                          small
                          icon
                          @click="deleteCol(col)"
                        >
                          <v-icon>close</v-icon>
                        </v-btn>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </draggable>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
    import draggable    from 'vuedraggable';
    import {mapGetters} from 'vuex';

    import actionCols   from '../../../constants/adsmanager/action_cols';
    import commonCols   from '../../../constants/adsmanager/common_cols';

    export default {
        name: 'AdsManagerColumnsDialog',

        components: {
            draggable
        },

        data() {
            return {
                commonCols,
                actionCols,
                cols: {
                    all: [],
                    filtered: [],
                },
                selectedCols: {
                    all: [],
                    filtered: [],
                },
                search: ''
            };
        },

        computed: {
            ...mapGetters({
                dialogs: 'adsmanager/dialogs',
                loading: 'adsmanager/loading',
                profile: 'main/profile'
            }),
        },

        watch: {
            profile: {
                deep: true,
                handler() {
                    if (this.selectedCols.all.length === 0) {
                        this.selectedCols.all = this.selectedCols.all.concat(this.profile.columns);
                        this.selectedCols.filtered = this.selectedCols.filtered.concat(this.selectedCols.all);
                    }
                }
            },

            search() {
                this.filterCols();
            },

            'selectedCols.all': {
                deep: true,
                handler() {
                    this.filterCols();
                }
            }
        },

        created() {
            this.cols.all = this.cols.all.concat(this.commonCols);
            this.cols.all = this.cols.all.concat(this.actionCols);
            this.cols.filtered = this.cols.all;

            this.selectedCols.all = this.selectedCols.all.concat(this.profile.columns);
            this.selectedCols.filtered = this.selectedCols.filtered.concat(this.selectedCols.all);
        },
        
        methods: {
            searchLeftCols(search) {
                if (!search) {
                    this.cols.filtered = this.cols.all;
                    return;
                }
                search = search.toString().toLowerCase();
                this.cols.filtered = this.cols.all.filter(col => {
                    const colName = this.$t(`adsmanager.cols.${col}`).toString().toLowerCase();
                    return colName.search(search) !== -1; 
                });
            },

            onMove(event) {
                // return true;
                // console.log(event.draggedContext.element);
                // console.log(event);
                return this.selectedCols.all.indexOf(event.draggedContext.element) === -1;
            },

            deleteCol(colToDelete) {
                this.selectedCols.all = this.selectedCols.all.filter(col => {
                    if (col === colToDelete) return false;
                    return true;
                });
                this.selectedCols.filtered = this.selectedCols.filtered.filter(col => {
                    if (col === colToDelete) return false;
                    return true;
                });
            },

            filterCols() {
                if (!this.search) {
                    this.selectedCols.filtered = this.selectedCols.all;
                    return;
                }

                this.selectedCols.filtered = this.selectedCols.all.filter(col => {
                    const colName = this.$t(`adsmanager.cols.${col}`).toString().toLowerCase();
                    return colName.search(this.search.toString().toLowerCase()) !== -1; 
                });
            },

            async saveCols() {
                const success = await this.$store.dispatch('adsmanager/saveCols', this.selectedCols.all);
                if (success) {
                    await this.$store.dispatch('main/loadProfile');
                    await this.$store.dispatch('adsmanager/closeDialog', 'columns');
                }
            },

            onChange(event) {
                console.log(event);
            },

            onStart(event) {
                console.log(event);
            }
        }
    };
</script>
<style>
    .cols-container {
        overflow-y: scroll; 
        max-height: calc(100vh - 150px); 
        padding: 8px;
    }

    .cols-container::-webkit-scrollbar {
        display: none;
    }
</style>