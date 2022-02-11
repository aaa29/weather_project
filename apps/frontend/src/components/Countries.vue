<script setup>
import { toRaw, ref } from 'vue'
import { useCountry, useCountries } from '../../composables'
import { useMap } from '../store'
import { storeToRefs } from 'pinia'

const store = useMap()
const { currentCountry, currentName } = storeToRefs(store)

const props = defineProps({
    countries: {
        type: Object,
        default: null,
    },
    covid_infos: {
        type: Object,
        default: null,
    },
})

const countries_ref = Object.assign({}, ...Object.keys(toRaw(props.countries)).map((c) => ({ [c]: toRaw(ref(null)) })))

function set_current_country(name) {
    const regions = Object.values(props.countries[name].path).map((r) => ({ [r.id]: false }))
    store.selectCountry(toRaw(props.countries[name]), toRaw(regions), toRaw(props.covid_infos[name]), name)

    Object.entries(countries_ref).forEach((c) => {
        let country = c[1].value[0]
        if (c[0] !== name) {
            if (country.classList.contains('active')) {
                country.classList.remove('active')
            }
        } else {
            country.classList.add('active')
        }
    })
}
</script>

<template>
    <div>
        <ul>
            <li v-for="name in Object.keys(countries)" :key="countries_ref[name]">
                <a :ref="toRaw(countries_ref[name])" href="#" @click="set_current_country(name)">
                    {{ name }}
                </a>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
div {
    height: 90vh;
    overflow-y: auto;
}

div > ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.2em;
}
div > ul > li {
    display: flex;
    justify-content: center;
    width: 80%;
    border-radius: 5px;
}

div > ul > li > a {
    border: 0.1rem solid var(--darker-grey);
    border-radius: 5px;
    color: inherit;
    font-weight: 400;
    width: 100%;
    height: inherit;
    display: flex;
    justify-content: center;
    padding: 0.5rem;

    cursor: pointer;
    &:hover {
        background-color: var(--darker-primary);
        color: white;
        box-shadow: 0 0 2.5rem var(--darker-primary);
    }
}

div > ul > li > a.active {
    background-color: var(--darker-primary);
    color: white;
    box-shadow: 0 0 2.5rem var(--darker-primary);
}
</style>
