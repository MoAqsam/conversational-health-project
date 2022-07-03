import { HttpService } from '../../../common/http/http.service'

const baseUrl = 'http://localhost:8050'

export class WeatherService {
    static async getCities() {
        return HttpService.sendRequest(`${baseUrl}/api/weather/cities`, {
            method: 'GET',
        })
    }
    static async getWeather(cityId: number) {
        return HttpService.sendRequest(
            `${baseUrl}/api/weather?city=${cityId}`,
            {
                method: 'GET',
            }
        )
    }
    static async getForeCast(cityId: number) {
        return HttpService.sendRequest(
            `${baseUrl}/api/weather/forecast?city=${cityId}`,
            {
                method: 'GET',
            }
        )
    }
}
