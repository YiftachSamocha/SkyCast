import { useState } from "react"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ForecastList } from "./ForecastList";
import { ForecastHeader } from "./ForecastHeader";
import { ForecastGraph } from "./ForecastGraph";
import { BouncyText } from "./CustomHooks.jsx/BouncyText";
import Lottie from 'lottie-react';
import sunAnimation from '../assets/sun.json'
import cloudAnimation from '../assets/cloud.json';


export function ForecastIndex() {
    const [currLoc, setCurrLoc] = useState(null)

    return <section className="forecast-index" style={{ backgroundColor: '#f5faff', height: '100%', minHeight: '100vh', }}  >
        <CssBaseline />
        <ForecastHeader clearLocation={() => setCurrLoc(null)} />
        <ForecastList currLoc={currLoc} setCurrLoc={setCurrLoc} />
        {currLoc ? <div>
            <ForecastGraph location={currLoc} clearLocation={() => setCurrLoc(null)} />
        </div> : <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '100%',
                textAlign: 'center',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <Lottie animationData={sunAnimation} loop={true} style={{ width: 200, height: 200 }} />
                <Lottie animationData={cloudAnimation} loop={true} style={{ width: 200, height: 200 }} />
            </div>

            <BouncyText text="Add a city to see your weekly forecast" />

        </Box>
        }
    </section>

}