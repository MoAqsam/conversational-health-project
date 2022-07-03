import router from '../../route/router'
import { HttpService } from '../../../common/http/http.service'
import { citiesData } from './cities.data'
import config from '../../config/config'
import { mapForeCast } from './mapper'

const baseUrl = 'https://api.openweathermap.org/data/2.5/'

function getUrl(type: 'weather' | 'forecast', city: string) {
    return `${baseUrl}${type}?id=${city}&appid=${config.weather.appId}&units=metric`
}

interface CityQueryParams {
    city: string
}

router.get('/weather', async (req, res) => {
    const { city } = req.query as unknown as CityQueryParams
    if (!city) {
        return res.send({ message: 'city is required' }).status(400)
    }
    try {
        const response = await HttpService.sendRequest(
            getUrl('weather', city),
            {
                method: 'GET',
            }
        )

        const { weather, wind, main } = response.data
        return res
            .send({
                weather: {
                    clouds: {
                        main: weather[0].main,
                        description: weather[0].description,
                    },
                    temperature: main.temp,
                    wind: {
                        speed: wind.speed,
                    },
                },
            })
            .status(200)
    } catch (err) {
        return res
            .send({ message: 'error retrieving weather details' })
            .status(500)
    }
})

router.get('/weather/forecast', async (req, res) => {
    const { city } = req.query as unknown as CityQueryParams
    if (!city) {
        return res.send({ message: 'city is required' }).status(400)
    }
    try {
        const response = await HttpService.sendRequest(
            getUrl('forecast', city),
            {
                method: 'GET',
            }
        )
        const { list } = response.data
        const mappedForeCast = mapForeCast(list)
        return res.send({ forecast: { list: mappedForeCast } }).status(200)
    } catch (err) {
        return res
            .send({ message: 'error retrieving forecast details' })
            .status(500)
    }
})

router.get('/weather/cities', (req, res) => {
    return res.send({ cities: citiesData }).status(200)
})

export default router
