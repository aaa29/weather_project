<script setup>
import { toRaw, ref } from 'vue'
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
})

const store = useMap()
const { currentName, currentCountry } = storeToRefs(store)

store.selectCountry(toRaw(props.country), toRaw('Algeria'))

function change(m, val) {
    if (val > 2000) {
        return m / 3
    } else if (val > 1000) {
        return m / 2
    } else return m
}

const regions = Object.assign({}, ...props.country.path.map((region) => ({ [region.id]: toRaw(ref(null)) })))

// const country = ref(null)

// function action(id) {
//     Object.entries(regions).forEach((r) => {
//         let region = r[1].value[0]
//         if (r[0] !== id) {
//             if (region.classList.contains('active')) {
//                 region.classList.remove('active')
//                 region.classList.add('inactive')
//             }
//         } else if (region.classList.contains('inactive')) {
//             region.classList.remove('inactive')
//             region.classList.add('active')
//         }
//     })
// }
</script>

<template>
    <div class="container">
        <svg class="map" :viewBox="currentCountry.viewbox" :width="change(currentCountry.width, currentCountry.height)" :height="auto">
            <g>
                <a v-for="region in currentCountry.path" :key="region.id" href="#" @click="action(region.id)">
                    <path :ref="toRaw(regions[region.id])" :id="region.id" :title="region.title" :d="region.d" class="land inactive" />
                </a>
            </g>
        </svg>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    position: relative;
    background-size: contain;
}

.container > .map {
    position: abolute;
    top: 0;
    left: 50em;
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
