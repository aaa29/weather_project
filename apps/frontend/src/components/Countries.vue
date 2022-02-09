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
})



function set_current_country(name) {
    let country = props.countries[name]
    store.selectCountry(toRaw(country), toRaw(name))
}
</script>

<template>
    <div>
        <ul>
            <li v-for="name in Object.keys(countries)" :key="name">
                <a href="#" @click="set_current_country(name)">
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
    color: var(--darkest-grey);
    width: 80%;
    padding: 0.5rem;
    border: 0.1rem solid var(--darker-grey);
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: var(--darker-primary);
        color: white;
        box-shadow : 0 0 2.5rem var(--darker-primary);
    }
    &:active {
        background-color: var(--darker-primary);
        color: white;
        box-shadow : 0 0 2.5rem var(--darker-primary);
    }
}

div > ul > li > a {
    color: inherit;
    font-weight: 400;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
}
</style>
