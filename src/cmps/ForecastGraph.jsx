import { useEffect, useState } from "react"
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { Summary } from "./CustomHooks.jsx/Summary";

export function ForecastGraph({ location, clearLocation }) {
    const [weekData, setWeekData] = useState([])
    const [isError, setIsError] = useState(false)
    const [isNight, setIsNight] = useState(false)
    const nightColor = '#2C3E50'
    const dayColor = '#FFECB3'

    useEffect(() => {
        if (location) getData(location)

    }, [location, isNight])

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
                return {
                    day: dayName,
                    date: formattedDate,
                    temp: isNight ? Math.round(item.temp.night) : Math.round(item.temp.day),
                    summary: item.summary,
                    img: `/img/weather-icons/${item.weather[0].icon}@2x.png`
                }
            })
            days[0].day = 'Today'
            setWeekData(days)

        } catch {
            setIsError(true)
        }

    }

    function Tick({ x, y, payload }) {
        const data = weekData.find((item) => item.date === payload.value)

        if (!data) return null

        const { day, date, img } = data
        return (
            <foreignObject x={x - 30} y={y + 10} width={70} height={70}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: '12px',
                    lineHeight: "1.2em",
                    color: '#333',
                }}>
                    <strong>{day}</strong>
                    <span>{date}</span>
                    <img src={img} style={{ height: '50px', width: '50px' }} />
                </div>
            </foreignObject>
        )
    }

    return <section>
        {isError ? <Typography variant="h6"
            sx={{
                fontWeight: 'bold',
                fontSize: '1.5em',
                color: '#d32f2f',
                textAlign: 'center',
                marginTop: '20px',
            }}>Couldn't load wheather forecast</Typography> : <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <AreaChart width={850} height={270} data={weekData}
                    margin={{ top: 0, right: 30, left: 30, bottom: 60 }}>
                    <XAxis dataKey="date" tick={<Tick />} />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']}
                        tick={{ fill: '#333', fontSize: 14, fontWeight: 'bold' }} hide />
                    <Tooltip content={<Summary />} cursor={false} />
                    <Area
                        type="monotone"
                        dataKey="temp"
                        stroke="#1976d2"
                        fill="#90caf9"
                        fillOpacity={0.7}
                        baseValue="dataMin"
                        label={{ position: 'top', fill: '#444', fontSize: 16 }}
                    />
                </AreaChart>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: 1, mt: 1.5 }}>
                <Button variant="contained" disableElevation onClick={clearLocation}>
                    Clear
                </Button>
                <Button variant="contained" disableElevation onClick={() => setIsNight(prev => !prev)}
                    sx={{
                        width: '100px',
                        backgroundColor: isNight ? nightColor : dayColor,
                        color: isNight ? 'white' : 'black',
                        border: '1px solid gray'
                    }}>
                    {isNight ? "Night" : "Day"}

                </Button>
            </Box>
        </div>

        }
    </section>

}