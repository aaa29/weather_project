<script setup>
import { toRaw, ref } from 'vue'
import Countries from './components/Countries.vue'
import { useCovid, useCountries } from '../composables'

const { loading_countries, countries } = useCountries()
const { loading_covid, covid_infos } = useCovid()


</script>

<template>
    <div class="container" :key="loading_countries">
    
        <aside v-if="!(loading_countries && loading_covid)">
            <Countries :countries="countries" :covid_infos="covid_infos" />
        </aside>
        <main v-if="!(loading_countries && loading_covid)">
            <router-view />
        </main>
        <div v-if="loading_countries || loading_covid">Loading....</div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    align-items: center;
    height: 100vh;
    width: 100%;
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
