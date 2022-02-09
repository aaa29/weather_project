<script setup>
import Map from '../components/Map.vue'
import { ref, toRaw } from 'vue'
import { AlgerianMap } from '../assets/svgs/map'
import { getCountry } from '../assets/svgs/world3'
import { useCountry } from '../../composables'



const { isLoading, country } = useCountry('Algeria')





</script>

<template>
    <div>
        <Map/>
    </div>
</template>