import { useState } from "react"
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ForecastList } from "./ForecastList";
import { ForecastHeader } from "./ForecastHeader";
import { ForecastGraph } from "./ForecastGraph";
import { keyframes, Typography } from "@mui/material";


export function ForecastIndex() {
    const [currLoc, setCurrLoc] = useState(null)
    const pulse = keyframes`
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.05);
      opacity: 0.85;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  `

    return <section className="forecast-index" >
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
                height: '50vh', 
                textAlign: 'center',
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    fontSize: '3em',
                    color: '#1976d2',
                    animation: `${pulse} 1s ease-out infinite`,
                }}
            >
                Add a city to see your weekly forecast
            </Typography>
        </Box>
        }
    </section>

}