import { useEffect, useState } from "react"
import { Area, AreaChart, Tooltip, XAxis, YAxis } from "recharts"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { Button, CircularProgress } from "@mui/material"
import { styled } from "@mui/material/styles"
import { Summary } from "./helpers/Summary"

 // Component styling
 const StyledLoaderBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    marginTop: "6em",
    paddingRight: "20em",
})

const StyledErrorMessage = styled(Typography)({
    fontWeight: 'bold',
    fontSize: '2em',
    color: '#d32f2f',
    textAlign: 'center',
})

const StyledClearButton = styled(Button)({
    backgroundColor: "#1976d2",
    color: "white",
    width: "100px",
    border: "1px solid gray",
    transition: "0.3s ease",
    "&:hover": {
        backgroundColor: "#0d47a1",
    },
})

const StyledToggleButton = styled(Button)(({ isNight, nightColor, dayColor }) => ({
    width: '100px',
    backgroundColor: isNight ? nightColor : dayColor,
    color: isNight ? 'white' : 'black',
    border: '1px solid gray',
    transition: "0.3s ease",
    "&:hover": {
        backgroundColor: isNight ? "#34495e" : "#ffe082",
    },
}))

const StyledChartBox = styled(Box)({
    height: 250,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
})

const StyledButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'space-around',
    padding: 1.5,
})

// The ForecastGraph component displays a weather forecast graph for a selected location.
// It fetches weather data from the OpenWeather API and visualizes it using an area chart.
// Includes a toggle for day/night temperatures, error handling, and a loader during data fetching.

export function ForecastGraph({ location, clearLocation, isSmallScreen }) {
    const [weekData, setWeekData] = useState([]) 
    const [isError, setIsError] = useState(false) 
    const [isNight, setIsNight] = useState(false) 
    const [isLoading, setIsLoading] = useState(true) 
    const nightColor = '#2C3E50' 
    const dayColor = '#FFECB3' 
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY 

    useEffect(() => {
        if (location) getData(location) // Fetch data whenever the location or night mode changes
    }, [location, isNight])

    // Fetches weather data for the selected location using Open Weather API
    async function getData(location) {
        try {
            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&exclude=current,hourly,minutely,alerts&appid=${apiKey}&units=metric`
            const response = await fetch(url)
            const data = await response.json()

            const today = new Date()
            const days = data.daily.map((item, idx) => {
                const date = new Date(today)
                date.setDate(today.getDate() + idx) // Calculate the date for each day
                const dayName = date.toLocaleDateString("en-US", { weekday: "long" }) // Get the day name 
                const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) // Format the date

                return {
                    day: dayName,
                    date: formattedDate,
                    temp: Math.round(isNight ? item.temp.night : item.temp.day), // Use night or day temperature based on mode
                    summary: item.summary, 
                    img: `/img/weather-icons/${item.weather[0].icon}@2x.png` 
                }
            })

            days[0].day = 'Today' // Label the first day as "Today"
            setWeekData(days) // Update the state with the fetched data
        } catch {
            setIsError(true) // Set error state if the fetch fails
        } finally {
            setIsLoading(false) // Stop the loading state
        }
    }

    // Custom tick component for the X-axis
    function Tick({ x, y, payload }) {
        const data = weekData.find((item) => item.date === payload.value) // Find the data for the current tick
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
                    <strong>{day}</strong> {/* Display the day name */}
                    <span>{date}</span> {/* Display the formatted date */}
                    <img src={img} style={{ height: '50px', width: '50px' }} /> {/* Display the weather icon */}
                </div>
            </foreignObject>
        )
    }

    return (
        <section>
            {/* Render the loader if data is still loading */}
            {isLoading ? (
                <StyledLoaderBox>
                    <CircularProgress
                        sx={{
                            width: '100px !important',
                            height: '100px !important',
                        }}
                    />
                </StyledLoaderBox>
            ) : (
                <div>
                    {/* Render an error message if data fetching fails */}
                    {isError ? (
                        <StyledErrorMessage>
                            Couldn't load weather forecast
                        </StyledErrorMessage>
                    ) : (
                        <div>
                            {/* Render the weather forecast graph */}
                            <StyledChartBox>
                                <AreaChart
                                    data={weekData}
                                    height={250}
                                    width={isSmallScreen ? 300 : 800}
                                    margin={{ top: 0, bottom: 60, right: 0, left: 30 }}
                                >
                                    <XAxis dataKey="date" tick={<Tick />} /> {/* Custom tick for X-axis */}
                                    <YAxis
                                        domain={['dataMin - 2', 'dataMax + 2']}
                                        tick={{ fill: '#333', fontSize: 14, fontWeight: 'bold' }}
                                        hide
                                    />
                                    <Tooltip content={<Summary />} cursor={false} /> {/* Tooltip for detailed info */}
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
                            </StyledChartBox>

                            {/* Render buttons for clearing location and toggling day/night mode */}
                            <StyledButtonContainer>
                                <StyledClearButton onClick={clearLocation}>
                                    Clear
                                </StyledClearButton>
                                <StyledToggleButton
                                    isNight={isNight}
                                    nightColor={nightColor}
                                    dayColor={dayColor}
                                    onClick={() => setIsNight((prev) => !prev)}
                                >
                                    {isNight ? "Night" : "Day"}
                                </StyledToggleButton>
                            </StyledButtonContainer>
                        </div>
                    )}
                </div>
            )}
        </section>
    )
}