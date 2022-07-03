import { OpenWeather } from '../../../common/OpenWeather'
import { ForeCastResponse } from '../../../common/ForeCastResponse'

/**
 * @description maps forecast data to forecast response
 * @param data
 */
export function mapForeCast(data: OpenWeather[]): ForeCastResponse[] {
    const mappedValues: ForeCastResponse[] = []
    data.forEach((dataValue: OpenWeather) => {
        mappedValues.push({
            date: new Date(dataValue.dt * 1000),
            temp: dataValue.main.temp,
            minTemp: dataValue.main.temp_min,
            wind: dataValue.wind.speed,
            maxTemp: dataValue.main.temp_max,
            description: dataValue.weather[0].description,
        })
    })
    return mappedValues
}
