import { useEffect, useState } from "react"
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import { styled } from '@mui/material'
import { ForecastList } from "./ForecastList"
import { ForecastHeader } from "./ForecastHeader"
import { ForecastGraph } from "./ForecastGraph"
import { BouncyText } from "./helpers/BouncyText"
import Lottie from 'lottie-react'
import sunAnimation from '../assets/sun.json'
import cloudAnimation from '../assets/cloud.json'
import { ForecastSearch } from "./ForecastSearch"

// Component styling
const StyledMainBox = styled(Box)(({ isSmallScreen }) => ({
    display: "flex",
    justifyContent: "space-between",
    paddingInline: "30px",
    paddingTop: "20px",
    alignItems: isSmallScreen ? "center" : "start",
    flexDirection: isSmallScreen ? "column" : "row",
}))

const StyledEmptyStateBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
})

// This is the main component that combines all other components.
// The `currLoc` state holds the selected location.
// If it's null, weather animation and a bouncy text appear; 
// Otherwise, the forecast graph is displayed.
export function ForecastIndex() {
    const [currLoc, setCurrLoc] = useState(null) // Tracks the currently selected location
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1100) // Tracks if the screen size is small

    // Updates the `isSmallScreen` state when the window is resized in order to make the components responsive
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 1100)
        window.addEventListener("resize", handleResize)

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <section className="forecast-index" style={{ backgroundColor: '#f5faff', height: '100%', minHeight: '100vh' }}>
            {/* Removes all default styling */}
            <CssBaseline />

            {/* Renders the header with the current location and a clear location function */}
            <ForecastHeader currLoc={currLoc} clearLocation={() => setCurrLoc(null)} />

            {/* Renders the list of forecasts and allows selecting a location */}
            <ForecastList currLoc={currLoc} setCurrLoc={setCurrLoc} isSmallScreen={isSmallScreen} />

            <StyledMainBox isSmallScreen={isSmallScreen}>
                {/* Renders the search bar for finding a location */}
                <ForecastSearch currLoc={currLoc} setCurrLoc={setCurrLoc} />

                {/* Conditional rendering: If a location is selected, show the forecast graph */}
                {currLoc ? (
                    <div>
                        <ForecastGraph location={currLoc} clearLocation={() => setCurrLoc(null)} isSmallScreen={isSmallScreen} />
                    </div>
                ) : (
                    // If no location is selected, show the empty state with animations and a message
                    <StyledEmptyStateBox>
                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                            <Lottie animationData={sunAnimation} loop={true} style={{ width: 200, height: 200 }} />
                            <Lottie animationData={cloudAnimation} loop={true} style={{ width: 200, height: 200 }} />
                        </div>
                        <BouncyText text="Add a city to see your weekly forecast" />
                    </StyledEmptyStateBox>
                )}
            </StyledMainBox>
        </section>
    )
}