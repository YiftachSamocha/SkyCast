import { useEffect, useState } from "react"

export function ForecastGraph({ location }) {
    const [weekData, setWeekData] = useState([])
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        if (location) getData(location)

    }, [location])

    async function getData(location) {
        try {
            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,hourly,minutely,alerts&appid=09dd6e9d0593d9c9c3f79b2762aa4908&units=metric`
            const response = await fetch(url)
            const data = await response.json()
            const today = new Date()
            const days = data.daily.map((item, idx) => {
                const date = new Date(today)
                date.setDate(today.getDate() + idx)
                const dayName = date.toLocaleDateString("en-US", { weekday: "long" })
                const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
                return { day: dayName, date: formattedDate, temp: item.temp.day }
            })
            days[0].day = 'today'
            setWeekData(days)

        } catch {
            setIsError(true)
        }

    }


    return <section>
        {isError ? <div>Couldnt load whethear forecast</div> :
            <table className="forecast-graph">
                <tbody>
                    <tr>
                        {weekData.map(info => {
                            return <td>{info.day}</td>
                        })}
                    </tr>
                    <tr>
                        {weekData.map(info => {
                            return <td>{info.date}</td>
                        })}
                    </tr>
                    <tr>
                        {weekData.map(info => {
                            return <td>{info.temp}</td>
                        })}
                    </tr>

                </tbody>
            </table>
        }
    </section>

}