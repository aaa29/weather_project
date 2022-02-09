<script setup>
import { ref, toRaw } from 'vue'
import { AlgerianMap } from '../assets/svgs/map'
import { getCountry } from '../assets/svgs/world3'
import { useCountries } from '../../composables'

const { isLoading, countries } = useCountries()

const regions = Object.assign({}, ...AlgerianMap.map((region) => ({ [region.id]: toRaw(ref(null)) })))

const country = ref(null)

function action(id) {
    Object.entries(regions).forEach((r) => {
        let region = r[1].value[0]
        if (r[0] !== id) {
            if (region.classList.contains('active')) {
                region.classList.remove('active')
                region.classList.add('inactive')
            }
        } else if (region.classList.contains('inactive')) {
            region.classList.remove('inactive')
            region.classList.add('active')
        }
    })
}
</script>

<template>
    <div>
        <svg class="map" xmlns="http://www.w3.org/2000/svg" xmlns:amcharts="http://amcharts.com/ammap" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 1500 1500" width="1000" height="1000" preserveAspectRatio="xMidYMid slice">
            <g>
                <a v-for="region in AlgerianMap" :key="region.id" href="#" @click="action(region.id)">
                    <path :ref="toRaw(regions[region.id])" :id="region.id" :title="region.title" :d="region.d" class="land inactive" />
                </a>
            </g>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.map {
    position: absolute;
    top: 10vh;
    left: 35%;
}
.land {
    fill-opacity: 1;
    stroke: white;
    stroke-opacity: 1;
    stroke-width: 0.5;
}

.active {
    fill: var(--darker-primary);
    filter: drop-shadow(0 0 2.5rem var(--darker-primary));
}

.inactive {
    fill: var(--dark-grey);
}

.land:hover {
    fill: var(--primary);
    filter: drop-shadow(0 0 2rem var(--darker-primary));
}
</style>
