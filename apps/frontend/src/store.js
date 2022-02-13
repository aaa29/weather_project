import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMap = defineStore('map', {
    state: () => ({
        currentCountry: null,
        currentRegions: null,
        covidData: null,
        currentRegion : null,
        currentName: null,
        countries: new Set(),
    }),

    actions: {
        selectCountry(country, regions, covidData, name) {
            this.currentCountry = country
            this.currentRegions = regions
            this.covidData = covidData
            this.currentName = name
        },
        setRegion(i, id, val) {
            this.currentRegions[i][id] = val
        },
        setCurrentRegion(region) {
            this.currentRegion = region
        }
    },
})

export const useDom = defineStore('dom', {
    state: () => ({
        hideContent: false,
        currentSearched : null,
    }),

    actions: {
        switchHideContent() {
            this.hideContent = !this.hideContent
        },
        setCurrentSearched(name){
            this.currentSearched = name;
        }
    }
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMap, import.meta.hot))
}
