<script setup>
import { toRaw, ref, reactive } from 'vue'
import { AlgerianMap } from '../assets/svgs/map'
import { getCountry } from '../assets/svgs/world3'
import { useCountry } from '../../composables'
import { useMap } from '../store'
import { storeToRefs } from 'pinia'

const props = defineProps({
    country: {
        type: Object,
        default: null,
    },
    covid: {
        type: Object,
        default: null,
    },
})

const store = useMap()
const { currentName, currentCountry, currentRegions, covidData, currentRegion } = storeToRefs(store)

const regions = Object.values(props.country.path).map((r) => ({ [r.id]: false }))

var selected_region = null

store.selectCountry(toRaw(props.country), toRaw(regions), toRaw(props.covid), 'Algeria')



function change(m, val) {
    if (val > 2000) {
        return m / 3.1
    } else if (val > 1000) {
        return m / 2
    } else return m / 1.5
}

function action(id) {
    var i = 0
    console.log(toRaw(store.covidData))
    store.currentRegions.forEach((r) => {
        let key = Object.keys(r)[0]
        if (key === id) {
            store.setRegion(i, key, true)
            Object.keys(store.covidData).forEach((c) => {
                if (store.currentCountry.path[i].name == c) {
                    store.setCurrentRegion(c)
                }
            })
        } else {
            store.setRegion(i, key, false)
        }
        i += 1
    })
}
</script>

<template>
    <div class="container" :key="change_regions">
        <svg class="map" :viewBox="currentCountry.viewbox" :width="change(currentCountry.width, currentCountry.height)" :height="auto">
            <g>
                <a v-for="(region, i) in currentCountry.path" :key="i || currentRegions[i][region.id]" href="#" @click="action(region.id)">
                    <path :id="region.id" :title="region.title" :d="region.d" class="land" :class="{ active: currentRegions[i][region.id], inactive: !currentRegions[i][region.id] }" />
                    {{ region.id }}
                </a>
            </g>
        </svg>

        <div class="info">
            <h3>Covid-19 information</h3>
            <div>confirmed cases : {{ covidData['All']['confirmed'] }}</div>
            <div>number of death's : {{ covidData['All']['deaths'] }}</div>
            <div v-if="covidData['All']['updated']">Latest update {{ covidData['All']['updated'] }}</div>
            <div v-if="currentRegion" :key="currentRegion" class="region">
                <h3>Covid-19 in {{ currentRegion }}</h3>
                <div>Confirmed cases {{ covidData[currentRegion]['confirmed'] }}</div>
                <div>Confirmed cases {{ covidData[currentRegion]['deaths'] }}</div>
                <div>Latest update {{ covidData[currentRegion]['updated'] }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    position: relative;
    background-size: contain;
    display: flex;
    align-items: center;
}

.container > .map {
    position: abolute;
    top: 0;
    left: 20em;
    padding: 0 10em;
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

.info {
    height: auto;
    width: 40%;
    border: 0.5 rem var(--light-grey);
    border-radius: 5px;
    box-shadow: 0 0 2.5rem var(--darker-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right : 2rem;
}

.info > h2 {
    font-size: 1.5rem;
    font-weight: 400;
    padding: 0.5rem;
}

.info > div {
    padding: 0.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
}

.region {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.region > div {
    width : 100%;
    padding : .5rem;
    display : flex;
    justify-content : center;
}

.info > h3, .region > h3 {
    width : 100%;
    font-size: 1.5rem;
    font-weight: 400;
    padding: 0.1rem;
    background : var(--primary);
    color : #ffffff;
    display : flex;
    justify-content: center;
}
</style>
