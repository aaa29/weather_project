import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMap = defineStore('map', {
    state: () => ({
        currentCountry: null,
        currentRegions: null,
        covidData: null,
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
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMap, import.meta.hot))
}
