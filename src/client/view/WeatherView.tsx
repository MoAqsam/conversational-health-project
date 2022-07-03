import React from 'react'
import { City } from '../../common/City'
import { WeatherService } from '../services/weather/weather.service'
import { Weather } from '../../common/Weather'
import { Select } from '../components/select/Select'
import { CityWeatherDetails } from '../components/city-weather-details/CityWeatherDetails'
import { ForeCastResponse } from '../../common/ForeCastResponse'
import { ForeCastDetails } from '../components/forecast-details/ForeCastDetails'
import './weather-view.scss'

interface WeatherViewState {
    cities: City[]
    city?: Weather
    forecast?: ForeCastResponse[]
    error: {
        message: string
        isError: boolean
    }
}

/**
 * @description container view for weather app
 */
export function WeatherView() {
    const [currentSelectedCityId, setCurrentSelectedCityId] = React.useState()
    const [state, setState] = React.useState<WeatherViewState>({
        cities: [],
        error: {
            message: '',
            isError: false,
        },
    })
    React.useEffect(() => {
        WeatherService.getCities()
            .then((response) => {
                const { cities } = response.data
                setState({
                    ...state,
                    cities,
                })
                setCurrentSelectedCityId(cities[0].id)
            })
            .catch((err) => {
                setState({
                    ...state,
                    error: {
                        message: 'Error getting cities',
                        isError: true,
                    },
                })
            })
    }, [])

    React.useEffect(() => {
        if (currentSelectedCityId) {
            WeatherService.getWeather(currentSelectedCityId)
                .then((response) => {
                    const { weather } = response.data
                    setShowForeCast(false)
                    setState({
                        ...state,
                        city: weather,
                    })
                })
                .catch((err) => {
                    setState({
                        ...state,
                        error: {
                            message: 'Error getting cities',
                            isError: true,
                        },
                    })
                })
        }
    }, [currentSelectedCityId])

    const handleSelectChange = (change: any) => {
        if (change.id) {
            setCurrentSelectedCityId(change.id)
        }
    }

    const [showForeCast, setShowForeCast] = React.useState(false)
    const handleShowForeCast = () => {
        if (currentSelectedCityId) {
            WeatherService.getForeCast(currentSelectedCityId)
                .then((response) => {
                    const { forecast } = response.data
                    setShowForeCast(true)
                    setState({
                        ...state,
                        forecast: forecast.list,
                    })
                })
                .catch((err) => {
                    setState({
                        ...state,
                        error: {
                            message: 'Error getting cities',
                            isError: true,
                        },
                    })
                })
        }
    }

    return (
        <div className={'weather-view'}>
            <h1 className={'weather-view--header'}>Weather Forecast</h1>
            <Select options={state.cities} emitChange={handleSelectChange} />
            <CityWeatherDetails {...(state.city as Weather)} />
            <button className={'button'} onClick={handleShowForeCast}>
                Forecast
            </button>
            {showForeCast && (
                <ForeCastDetails list={state.forecast as ForeCastResponse[]} />
            )}
        </div>
    )
}
