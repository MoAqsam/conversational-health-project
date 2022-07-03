import { ForeCastResponse } from '../../../common/ForeCastResponse'
import React from 'react'
import moment from 'moment'
import './forecast-details.scss'

interface ForeCastDetailsProps {
    list: ForeCastResponse[]
}

export const ForeCastDetails = (props: ForeCastDetailsProps) => {
    const { list } = props
    const [dateGroups, setDateGroups] = React.useState<any>({})
    const [selectedDay, setSelectedDay] = React.useState<any>()
    const [rendered, setRendered] = React.useState(false)
    if (list && !rendered) {
        const hash: any = {}
        list.forEach((dateItem) => {
            const { date } = dateItem
            const day = moment(date).get('dayOfYear')
            if (day in hash) {
                hash[day].push(dateItem)
            } else {
                hash[day] = [dateItem]
            }
        })
        const firstDay = Object.keys(hash)[0]
        setDateGroups(hash)
        setSelectedDay(firstDay)
        setRendered(true)
    }
    const dateFilters: any = []
    Object.entries(dateGroups).forEach((entry) => {
        const [key, value] = entry as any
        dateFilters.push({ hash: key, date: value[0].date })
    })
    const handleDayChange = (day: string) => {
        setSelectedDay(day)
    }
    return (
        <div className={'forecast-details'}>
            <table>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Temp</td>
                        <td>Min Temp</td>
                        <td>Max Temp</td>
                        <td>Wind</td>
                        <td>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {dateGroups[selectedDay]?.map(
                        (forecast: ForeCastResponse, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {moment(forecast.date).format(
                                            'MMM DD,  hh:mm A'
                                        )}
                                    </td>
                                    <td>
                                        {forecast.temp} <span>&#8451;</span>
                                    </td>
                                    <td>
                                        {forecast.minTemp} <span>&#8451;</span>
                                    </td>
                                    <td>
                                        {forecast.maxTemp} <span>&#8451;</span>
                                    </td>
                                    <td>{forecast.wind} m/s</td>
                                    <td>{forecast.description}</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
            <div className={'filter-dates'}>
                {dateFilters.map(
                    (
                        dateFilter: { hash: string; date: Date },
                        index: number
                    ) => {
                        const { hash, date } = dateFilter
                        return (
                            <button
                                onClick={() => handleDayChange(hash)}
                                className={`button ${
                                    selectedDay === hash && 'button-active'
                                }`}
                                key={index}
                            >
                                {moment(date).format('MMMM DD')}
                            </button>
                        )
                    }
                )}
            </div>
        </div>
    )
}
