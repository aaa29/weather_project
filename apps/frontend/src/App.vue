<script setup>
import Countries from './components/Countries.vue'
import { useCountry, useCountries } from '../composables'


const { isLoading, countries } = useCountries()


</script>

<template>
    <div class="container">
        <main v-if="!isLoading">
            <router-view />
        </main>
        <aside v-if="!isLoading">
            <Countries :countries="countries"/>
        </aside>
        <div v-if="isLoading">
            Loading....
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    height: 100vh;
}
</style>
