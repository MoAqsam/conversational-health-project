import axios from 'axios'

interface HttpServiceParams {
    method: 'PUT' | 'GET' | 'POST' | 'PATCH' | 'DELETE'
}

export class HttpService {
    /**
     * @description sends http request
     * @param url
     * @param params
     */
    static async sendRequest(url: string, params: HttpServiceParams) {
        return axios.request({
            url,
            method: params.method,
        })
    }
}
