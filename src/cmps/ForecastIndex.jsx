import { useState } from "react"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { ForecastGraph } from "./ForecastGraph"
import { ForecastList } from "./MUI cmps/ForecastList"
import ForecastHeader from "./MUI cmps/ForecastHeader"
import CssBaseline from '@mui/material/CssBaseline';


export function ForecastIndex() {
    const [currLoc, setCurrLoc] = useState(null)

    return <section className="forecast-index" >
        <CssBaseline />
        <ForecastHeader clearLocation={() => setCurrLoc(null)} />
        <ForecastList currLoc={currLoc} setCurrLoc={setCurrLoc} />
        {currLoc && <div>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" disableElevation onClick={() => setCurrLoc(null)}>
                    Clear
                </Button>
            </Box>

            <ForecastGraph location={currLoc} />
        </div>
        }
    </section>

}