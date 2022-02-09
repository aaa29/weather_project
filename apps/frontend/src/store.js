import { defineStore, acceptHMRUpdate } from 'pinia'

export const useMap = defineStore('map', {
    state: () => ({
        currentCountry : null,
        currentName : null,
        countries : new Set(),
    }),

    actions : {        
        selectCountry(country, name){
            this.currentCountry = country
            this.currentName = name
        }
    }
})



if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMap, import.meta.hot))
}