<template>
<div>
        <tabs/>
        <div style="padding: 8px;">
            <keep-alive>
                <component :is="activeTab.component"></component>
            </keep-alive>
        </div>
        
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import tabs from '../../components/adsmanager/AdsManagerTabs'
    import accounts from './Accounts';
    import campaigns from './Campaigns';
    import cabs from './Cabs';
    import adsets from './Adsets';
    import users from './Users';
    import ads from './Ads';

    export default {
        name: 'AdsManager',
        
        components: {
            tabs,
            campaigns,
            accounts,
            cabs,
            adsets,
            users,
            ads
        },

        computed: {
            ...mapGetters({
                activeTab: 'adsmanager/activeTab'
            })
        }
    }
</script>