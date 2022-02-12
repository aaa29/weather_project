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
const search_ref = ref(null)
const scroll_body = ref(null)

function search() {
    console.log('search', search_ref.value)
    if (search_ref.value) {
        let country = Object.keys(countries_ref).find((c) => c.toLowerCase().includes(search_ref.value.toLowerCase()))
        console.log('peeee', country)
        if (country) {
            // scroll to the search value
            console.log(scroll_body.value)
            scroll_body.value.scrollTop = countries_ref[country].value[0].offsetTop - scroll_body.value.offsetTop
        }
    }
}

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
        store.setCurrentRegion(null)
    })
}
</script>

<template>
    <div class="container_countries">
        <div class="search">
            <input v-model="search_ref" type="text" @keyup.enter="search" />
        </div>
        <div ref="scroll_body" class="countries" id="style-2">
            <ul>
                <li v-for="name in Object.keys(countries)" :key="countries_ref[name]">
                    <a :ref="toRaw(countries_ref[name])" href="#" @click="set_current_country(name)" :active="false">
                        {{ name }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container_countries {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: flex-end;
    margin-top: 2em;
}

.search {
    width: 80%;
    display: flex;
    justify-content: center;
}
.search > input {
    margin-left: 1.5em;
    width: 80%;
    padding: 0.7em;
    font-size: 1em;
}

.countries {
    height: 90vh;
    overflow-y: auto;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.6em;
    margin-top: 1.5em;
}

.countries > ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    gap: 0.6em;
}
.countries > ul > li {
    display: flex;
    width: 100%;
    justify-content: center;
    border-radius: 5px;
    margin: 0;
    padding: 0;
}

.countries > ul > li > a {
    border: 0.1rem solid none;
    border-radius: 5px;
    color: inherit;
    font-weight: 400;
    width: 100%;
    height: inherit;
    display: flex;
    justify-content: center;
    padding: 0.5rem;
    box-shadow: 0 0 0.5rem var(--dark-grey);

    cursor: pointer;
    &:hover {
        background-color: var(--darker-primary);
        color: white;
        box-shadow: 0 0 2.5rem var(--darker-primary);
    }
}

.countries > ul > li > a.active {
    background-color: var(--darker-primary);
    color: white;
    box-shadow: 0 0 2.5rem var(--darker-primary);
}

#style-2::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: var(--darker-grey);
}

#style-2::-webkit-scrollbar {
    width: 12px;
    background-color: var(--light-grey);
}

#style-2::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: var(--primary);
}
</style>
