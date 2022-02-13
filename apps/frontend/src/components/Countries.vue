<script setup>
import { toRaw, ref } from 'vue'
import { useCountry, useCountries } from '../../composables'
import { useMap, useDom } from '../store'
import { storeToRefs } from 'pinia'

const store = useMap()
const { currentCountry, currentName } = storeToRefs(store)

const storeDom = useDom()
const { hideContent, currentSearched } = storeToRefs(storeDom)

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
        let name = Object.keys(countries_ref).find((c) => c.toLowerCase().startsWith(search_ref.value.toLowerCase()))
        console.log('peeee', name)
        if (name) {
            // scroll to the search value
            console.log('height', scroll_body.value)
            let scroll_value = countries_ref[name].value[0].offsetTop - scroll_body.value.offsetTop - scroll_body.value.clientHeight / 2.2
            scroll_body.value.scrollTo({
                top: scroll_value,
                behavior: 'smooth',
            })
            storeDom.setCurrentSearched(name)
        }
    }
}

function hide_content() {
    storeDom.switchHideContent()
    console.log('hide_content', storeDom.hideContent)
}

function show_content(name) {
    if (!storeDom.hideContent) {
        return name
    }
    return null
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
        storeDom.setCurrentSearched(null)
    })
}
</script>

<template>
    <div class="container_countries">
        <div class="search" :class="{ hide_search: hideContent, show_search: !hideContent }">
            <input v-model="search_ref" type="text" @keyup.enter="search" :class="{ show_input: !hideContent }" />
            <button class="menu-icon-btn" data-menu-icon-btn @click="hide_content">
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="menu-icon">
                    <g><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
                </svg>
            </button>
        </div>
        <div ref="scroll_body" class="countries" :class="{ hide_countries: hideContent, show_countries: !hideContent }" id="style-2">
            <ul>
                <li v-for="name in Object.keys(countries)" :key="countries_ref[name]">
                    <a :ref="toRaw(countries_ref[name])" href="#" @click="set_current_country(name)" :class="{ searched: currentSearched === name }">
                        {{ name }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container_countries {
    height: 100vh;
    width: 80mm;
    justify-content: flex-end;
    margin-top: 2em;
}

.search {
    transition: width var(--animation-duration) var(--animation-timing-curve);
    display: flex;
    justify-content: center;
}

// show or hide search
.show_search {
    width: 100%;
}
//
.hide_search {
    width: 0;
}
// end

.search > input {
    margin-left: 1.5em;
    width: 100%;
    font-size: 1em;
    // hide border and add box shadow
    border: none;
    box-shadow: 0 0 2em 1px #ccc;
    border-radius: 0.5em 0 0 0.5em;
}

.show_input {
    padding: 0.7em;
}

.menu-icon-btn {
    border: none;
    padding: 0;
    border-radius: 0 0.5em 0.5em 0;
}

.menu-icon {
    width: 25px;
    height: 25px;
    fill: var(--medium-gray);
    cursor: pointer;
}

.menu-icon:hover {
    fill: var(--dark-gray);
}

.countries {
    height: 90vh;
    transition: width var(--animation-duration) var(--animation-timing-curve);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1.5em;
}

// show or hide countires side bar after search button is clicked
.show_countries {
    width: 100%;
    padding: 0 0.6em;
}
//
.hide_countries {
    width: 0;
}
// end

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

.countries > ul > li > a.searched {
    background-color: var(--light-primary);
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
