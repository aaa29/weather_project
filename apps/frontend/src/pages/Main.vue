<script setup>
import Map from '../components/Map.vue'
import { ref, toRaw } from 'vue'
import { useCountries } from '../../composables'
import { useMap } from '../store'
import { storeToRefs } from 'pinia'

const store = useMap()
const { currentCountry, currentName } = storeToRefs(store)

const { isLoading, countries } = useCountries()

// store.selectCountry(toRaw(countries['Algeria']), toRaw('Algeria'))
</script>

<template>
    <div class="container">
        <Map :country="countries['Algeria']"/>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 60%;
}
</style>
