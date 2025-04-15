export function ForecastGraph({location}) {
    const weekData = [
        { day: "Sunday", temp: 17 },
        { day: "Monday", temp: 4 },
        { day: "Tuesday", temp: 23 },
        { day: "Wednesday", temp: 11 },
        { day: "Thursday", temp: 28 },
        { day: "Friday", temp: 9 },
        { day: "Saturday", temp: 30 }
    ];


    return <section>
        <table className="forecast-graph">
            <tbody>
                <tr>
                    {weekData.map(info => {
                        return <td>{info.day}</td>
                    })}
                </tr>
                <tr>
                    {weekData.map(info => {
                        return <td>{info.temp}</td>
                    })}
                </tr>

            </tbody>
        </table>
    </section>

}