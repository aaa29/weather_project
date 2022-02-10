import { useQuery } from 'vue-query'

export function useCountries() {
    const { isLoading: loading_countries, data: countries } = useQuery('countires/', async () => {
        const response = await fetch('http://localhost:8001/countries')
        return response.json()
    })

    return { loading_countries, countries }
}

export function useCountry(name) {
    var { isLoading, data: country } = useQuery('country/' + name, async () => {
        const response = await fetch('http://localhost:8001/country/' + name)
        return response.json()
    })

    return { isLoading, country }
}

export function useCovid() {
    const { isLoading: loading_covid, data: covid_infos } = useQuery(
        'covid/',
        async () => {
            const response = await fetch('http://localhost:8001/covid')
            return response.json()
        },
        {
            staleTime: 60 * 10000,
        }
    )
    return { loading_covid, covid_infos }
}
