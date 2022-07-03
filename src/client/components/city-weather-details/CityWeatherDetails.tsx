import { Weather } from '../../../common/Weather'
import React from 'react'
import './city-weather-details.scss'

export const CityWeatherDetails = (props: Weather) => {
    const { clouds, temperature, wind } = props
    return (
        <div className={'city-weather-details'}>
            <div className={'card'}>
                <span className={'card-title'}>{clouds?.main}</span>
                <br />
                <span className={'card-subtitle'}>{clouds?.description}</span>
            </div>
            <br />
            <div className={'card'}>
                <span className={'card-title'}>
                    {temperature} <span>&#8451;</span>
                </span>
                <br />
                <span className={'card-subtitle'}>{wind?.speed} m/s</span>
            </div>
        </div>
    )
}
