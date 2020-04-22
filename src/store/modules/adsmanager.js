import moment from 'moment';

export default {
    namespaced: true,
    state: {
        activeTab:{
            tab: 1,
            component: 'accounts'
        },
        filters: {
            tags: typeof localStorage.getItem('adsmanager-filters-tags') === 'undefined' ? [] : JSON.parse(localStorage.getItem('adsmanager-filters-tags')),
            dates: localStorage.getItem('adsmanager-filters-dates') === null ? 
            {
                startDate: moment().format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            } :
            JSON.parse(localStorage.getItem('adsmanager-filters-dates')),
        }
    },
    getters: {
        activeTab: state => state.activeTab,
        filters: state => state.filters,
    },
    mutations: {
        SET_ACTIVE_TAB: (state, tab) => {
            state.activeTab = tab;
        },

        SET_FILTERS_TAGS: (state, tags) => {
            state.filters.tags = tags;
            localStorage.setItem('adsmanager-filters-tags', JSON.stringify(tags));
        },

        SET_FILTERS_DATES: (state, dates) => {
            state.filters.dates = dates;
            localStorage.setItem('adsmanager-filters-dates', JSON.stringify(dates));
        }
    },
    actions: {
        async setActiveTab(context, tab) {
            context.commit('SET_ACTIVE_TAB', tab);
        },

        async setFiltersTags(context, tags) {
            context.commit('SET_FILTERS_TAGS', tags);
        },

        async setFiltersDates(context, dates) {
            context.commit('SET_FILTERS_DATES', dates);
        }
    }
};