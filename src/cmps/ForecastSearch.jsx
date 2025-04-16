import { Autocomplete, Box, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { styled } from "@mui/material/styles"

// Component styling
const StyledSearchBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
})

// The ForecastSearch component provides a search bar for users to find and select a location.
// It fetches city data from the GeoDB Cities API based on user input and updates the selected location.

export function ForecastSearch({ currLoc, setCurrLoc }) {
    const controller = new AbortController()
    const [cities, setCities] = useState([]) 
    const [input, setInput] = useState('')
    const [isError, setIsError] = useState(false) 
    const apiKey = process.env.REACT_APP_CITIES_API_KEY 

    useEffect(() => {
        if (!input.trim()) return // Do nothing if the input is empty

        // Debounce the API call to avoid excessive requests
        const timeoutId = setTimeout(() => {
            getCities()
        }, 1000)
        return () => clearTimeout(timeoutId) 
    }, [currLoc, input])

    // Fetches a list of cities matching the user's input
    async function getCities() {
        try {
            const response = await fetch(
                `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${input}`,
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": apiKey,
                        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
                    },
                    signal: controller.signal,
                }
            )
            const data = await response.json()
            const newCities = data.data.map(item => ({
                id: item.id,
                lat: item.latitude,
                lon: item.longitude,
                city: item.city,
                country: item.country,
                label: `${item.city}, ${item.country}`, // Combines city and country for display
            }))
            setIsError(false) // Reset error state
            setCities(newCities) // Update the cities state
        } catch {
            setIsError(true) // Set error state if the fetch fails
        }
    }

    return (
        <StyledSearchBox>
            {/* Autocomplete search bar for adding a location */}
            <Autocomplete
                disablePortal
                options={isError ? [] : cities} // Show no options if there's an error
                onChange={(event, newValue) => setCurrLoc(newValue)} // Update the selected location
                inputValue={input} 
                onInputChange={(event, newInput) => setInput(newInput)} 
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Add location" />}
            />
        </StyledSearchBox>
    )
}