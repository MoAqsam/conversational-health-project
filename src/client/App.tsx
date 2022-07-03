import React from 'react'
import { WeatherView } from './view/WeatherView'
import './app.scss'

export default function App() {
    return (
        <div className={'container'}>
            <WeatherView />
        </div>
    )
}
