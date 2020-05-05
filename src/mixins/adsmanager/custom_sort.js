export default {
  methods: {
    customSort(items, index, isDesc) {
      if (index.length > 0) {
        if (index[0].search('quantity') > -1) {
          items.sort((a, b) => {
            const aValue = typeof this.stat[a.id]['actions'][index[0].replace('-quantity', '')] !== 'undefined' ?
              this.stat[a.id]['actions'][index[0].replace('-quantity', '')]['quantity'] : 0;
            const bValue = typeof this.stat[b.id]['actions'][index[0].replace('-quantity', '')] !== 'undefined' ?
              this.stat[b.id]['actions'][index[0].replace('-quantity', '')]['quantity'] : 0;

            if (aValue > bValue) {
              return isDesc[0] ? -1 : 1;
            }
            if (aValue < bValue) {
              return isDesc[0] ? 1 : -1;
            }
            return 0;
          });
        }

        if (index[0].search('cpa') > -1) {
          items.sort((a, b) => {
            const aValue = typeof this.stat[a.id]['actions'][index[0].replace('-cpa', '')] !== 'undefined' ?
              this.stat[a.id]['actions'][index[0].replace('-cpa', '')]['cpa'] : 0;
            const bValue = typeof this.stat[b.id]['actions'][index[0].replace('-cpa', '')] !== 'undefined' ?
              this.stat[b.id]['actions'][index[0].replace('-cpa', '')]['cpa'] : 0;

            if (aValue > bValue) {
              return isDesc[0] ? -1 : 1;
            }
            if (aValue < bValue) {
              return isDesc[0] ? 1 : -1;
            }
            return 0;
          });
        }

        if (index[0].search('cr') > -1) {
          items.sort((a, b) => {
            const aValue = typeof this.stat[a.id]['actions'][index[0].replace('-cr', '')] !== 'undefined' ?
              this.stat[a.id]['actions'][index[0].replace('-cr', '')]['cr'] : 0;
            const bValue = typeof this.stat[b.id]['actions'][index[0].replace('-cr', '')] !== 'undefined' ?
              this.stat[b.id]['actions'][index[0].replace('-cr', '')]['cr'] : 0;

            if (aValue > bValue) {
              return isDesc[0] ? -1 : 1;
            }
            if (aValue < bValue) {
              return isDesc[0] ? 1 : -1;
            }
            return 0;
          });
        }

        if (typeof this.stat[Object.keys(this.stat)[0]][index[0]] !== 'undefined') {
          items.sort((a, b) => {
            const aValue = this.stat[a.id][index[0]];
            const bValue = this.stat[b.id][index[0]];

            if (aValue > bValue) {
              return isDesc[0] ? -1 : 1;
            }
            if (aValue < bValue) {
              return isDesc[0] ? 1 : -1;
            }
            return 0;
          });
        }

        if (index[0] == 'account') {
          items.sort((a, b) => {
            const result = a.name.toString().localeCompare(b.name.toString());
            return isDesc[0] ? result * -1 : result;
          });
        }

        if (index[0] == 'status') {
          items.sort((a, b) => {
            const result = a.status.toString().localeCompare(b.status.toString());
            return isDesc[0] ? result * -1 : result;
          });
        }
      }

      return items;
    }
  }
};