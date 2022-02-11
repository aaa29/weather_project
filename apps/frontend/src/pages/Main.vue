<script setup>
import Map from '../components/Map.vue'
import { ref, toRaw } from 'vue'
import { useCountries, useCovid } from '../../composables'
import { useMap } from '../store'
import { storeToRefs } from 'pinia'

const store = useMap()
const { currentCountry, currentName } = storeToRefs(store)


const { loading_countries, countries } = useCountries()
const { loading_covid, covid_infos } = useCovid()


</script>

<template>
    <div v-if="!(loading_countries || loading_covid)" class="container">
        <Map :country="countries['Algeria']" :covid="covid_infos['Algeria']"/>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    display: flex;
    
}
</style>
