<template>
  <td>
    <span
      v-if="show"
    >
      <span v-if="col === 'action_results'">
        {{ 
          itIsTotalRow ? 
            numeral(stat['total']['results']).format('0,0.[00]').replace(',', ' ') : 
            numeral(stat[item.id]['results']).format('0,0.[00]').replace(',', ' ') 
        }}
      </span>
      <span v-else>
        {{ 
          itIsTotalRow ? 
            numeral(stat['total']['actions'][col]['quantity']).format('0,0.[00]').replace(',', ' ') : 
            numeral(stat[item.id]['actions'][col]['quantity']).format('0,0.[00]').replace(',', ' ') 
        }}
      </span>
    </span>
    <span v-else>
      0
    </span>
  </td>
</template>

<script>
    import numeral        from 'numeral';
    import { mapGetters } from 'vuex';

    export default {
        name: 'AdsManagerComplexStatCellQuantity',

        props: {
            item: {
                type: Object,
                default: () => ({})
            },
            col: {
                type: String,
                default: '',
            },
            itIsTotalRow: {
              type: Boolean,
              default: false,
            }
        },

        data() {
          return {
            numeral
          };
        },

        computed: {
            ...mapGetters({
                stat: 'accounts/stat'
            }),

            show() {
                if (this.col === 'action_results') {
                  if(this.itIsTotalRow) {
                    return (
                      typeof this.stat['total'] !== 'undefined' &&
                      typeof this.stat['total']['results'] !== 'undefined'
                    );
                  }

                  return (
                    typeof this.stat[this.item.id] !== 'undefined' &&
                    typeof this.stat[this.item.id]['results'] !== 'undefined'
                  ); 
                }

                if(this.itIsTotalRow) {
                  return (
                    typeof this.stat['total'] !== 'undefined' &&
                    typeof this.stat['total']['actions'] !== 'undefined' &&
                    typeof this.stat['total']['actions'][this.col] !== 'undefined'
                  );
                }

                return (
                    typeof this.stat[this.item.id] !== 'undefined' &&
                    typeof this.stat[this.item.id]['actions'] !== 'undefined' &&
                    typeof this.stat[this.item.id]['actions'][this.col] !== 'undefined' 
                );
            }
        },
    };
</script>