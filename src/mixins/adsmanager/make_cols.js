export default {
    methods: {
        makeCols(firstCols = null) {
            let cols = [];
            let simpleCellWidth = 100;

            if (firstCols) {
                cols = cols.concat(firstCols);
            }

            this.profile.columns.forEach(col => {
                if (col.search('action') === 0) {
                    let quantityCol = {
                        text: `${this.$t(`adsmanager.cols.${col}`)}`,
                        value: `${col}-quantity`,
                        width: 100
                    };
                    let crCol = {
                        text: `${this.$t(`adsmanager.cols.${col}`)}, ${this.$t('common.conversionRate')}`,
                        value: `${col}-cr`,
                        width: 100
                    };
                    let cpaCol = {
                        text: `${this.$t(`adsmanager.cols.${col}`)}, ${this.$t('common.cpa')}`,
                        value: `${col}-cpa`,
                        width: 100
                    };

                    if (col === 'action_link_click') {
                        quantityCol.text = this.$t(`adsmanager.cols.${col}`);
                        crCol.text = 'CTR';
                        cpaCol.text = 'CPC';
                    }

                    cols.push(quantityCol);
                    cols.push(crCol);
                    cols.push(cpaCol);
                } else {
                    if (col === 'billing') {
                        if (
                            this.$store.state.adsmanager.activeTab.component === 'users' ||
                            this.$store.state.adsmanager.activeTab.component === 'accounts' ||
                            this.$store.state.adsmanager.activeTab.component === 'cabs' ||
                            this.$store.state.adsmanager.activeTab.component === 'dates'
                        ) return;

                        simpleCellWidth = 200;
                    } else {
                        simpleCellWidth = 100;
                    }
                    cols.push({
                        text: `${this.$t(`adsmanager.cols.${col}`)}`,
                        value: col,
                        width: simpleCellWidth,
                    });
                }
            });
            return cols;
        }
    }
};