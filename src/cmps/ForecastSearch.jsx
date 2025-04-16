import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export function ForecastSearch({ currLoc, setCurrLoc }) {
    const controller = new AbortController()
    const [cities, setCities] = useState([])
    const [input, setInput] = useState('')
    const [isError, setIsError] = useState(false)
    const apiKey = process.env.REACT_APP_CITIES_API_KEY

    useEffect(() => {
        if (!input.trim()) return

        const timeoutId = setTimeout(() => {
            getCities()
        }, 1000)
        return () => clearTimeout(timeoutId);
    }, [currLoc, input])

    async function getCities() {
        try {
            const response = await fetch(
                `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}`,
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": apiKey,
                        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
                    },
                    signal: controller.signal
                }
            )
            const data = await response.json()
            const newCities = data.data.map(item => {
                return {
                    id: item.id,
                    lat: item.latitude,
                    lon: item.longitude,
                    city: item.city,
                    country: item.country,
                    label: `${item.city}, ${item.country}`
                }
            })
            setIsError(false)
            setCities(newCities)

        } catch {
            setIsError(true)
        }
    }

    return <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}
    > <Autocomplete
            disablePortal
            options={isError ? [] : cities}
            onChange={(event, newValue) => setCurrLoc(newValue)}
            inputValue={input}
            onInputChange={(event, newInput) => setInput(newInput)}
            sx={{
                width: 300,
            }}
            renderInput={(params) => <TextField {...params} label="Add location" />}
        />
    </Box>
}