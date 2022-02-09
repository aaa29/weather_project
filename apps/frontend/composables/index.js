import { useQuery } from 'vue-query'

export function useCountries() {
    const { isLoading, data: countries } = useQuery('countires/', async () => {
        const response = await fetch('http://localhost:8001/countries')
        return response.json()
    })

    return { isLoading, countries }
}

export function useCountry(name) {
    var { isLoading, data: country } = useQuery('country/' + name, async () => {
        const response = await fetch('http://localhost:8001/country/' + name)
        return response.json()
    })

    return { isLoading, country }
}
