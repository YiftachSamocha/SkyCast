import { useEffect, useState } from "react"
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiTooltip from "@mui/material/Tooltip";
import { Button } from "@mui/material";

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
                    tempDay: Math.round(item.temp.day),
                    tempNight: Math.round(item.temp.night),
                    summary: item.summary
                }
            })
            days[0].day = 'Today'
            setWeekData(days)

        } catch {
            setIsError(true)
        }

    }
    function Summary({ active, payload }) {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <MuiTooltip>
                    <Box sx={{
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                        textAlign: 'center',
                        minWidth: '150px',
                    }}>
                        <Typography variant="subtitle1">{`${data.day}, ${isNight ? data.tempNight : data.tempDay}°C`}</Typography>
                        <Typography variant="body2">{data.summary}</Typography>
                    </Box>
                </MuiTooltip>
            )
        }
        return null
    }






    return <section>
        {isError ? <div>Couldnt load whethear forecast</div> : <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
                <AreaChart width={850} height={250} data={weekData}
                    margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                    <XAxis dataKey="day" />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']}
                        tick={{ fill: '#333', fontSize: 14, fontWeight: 'bold' }} hide />
                    <Tooltip content={<Summary />} cursor={false} />
                    <Area
                        type="monotone"
                        dataKey={isNight ? "tempNight" : "tempDay"}
                        stroke="#1976d2"
                        fill="#90caf9"
                        fillOpacity={0.7}
                        baseValue="dataMin"
                        label={{ position: 'top', fill: '#444', fontSize: 16 }}
                    />



                </AreaChart>

            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', margin: 3, mt: 2 }}>
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