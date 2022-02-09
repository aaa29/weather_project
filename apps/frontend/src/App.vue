<script setup>
import { toRaw, ref } from 'vue'
import Countries from './components/Countries.vue'
import { useCountry, useCountries } from '../composables'

const { isLoading, countries } = useCountries()






</script>

<template>

    <div class="container" :key="isLoading">
        
        <aside v-if="!isLoading">
            <Countries :countries="countries"/>
        </aside>
        <main v-if="!isLoading">
            <router-view />
        </main>
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
    width : 100%;
}
main {
    width: 80%;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}


</style>
