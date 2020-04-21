<template>
    <div class="mx-2">
        <span v-if="$i18n.locale === 'ru'" class="mr-1">🇷🇺</span> 
        <span v-if="$i18n.locale === 'en'" class="mr-1">🇬🇧</span> 
        <select style="cursor: pointer;" v-model="$i18n.locale">
            <option value="en">English</option>
            <option value="ru">Русский</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: 'TopbarLocale',
        data: () => ({
            newLocale: '',
        })
    }
</script>