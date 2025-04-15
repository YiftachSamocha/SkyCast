import { useState } from "react"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ForecastList } from "./ForecastList";
import { ForecastHeader } from "./ForecastHeader";
import { ForecastGraph } from "./ForecastGraph";


export function ForecastIndex() {
    const [currLoc, setCurrLoc] = useState(null)

    return <section className="forecast-index" >
        <CssBaseline />
        <ForecastHeader clearLocation={() => setCurrLoc(null)} />
        <ForecastList currLoc={currLoc} setCurrLoc={setCurrLoc} />
        {currLoc && <div>
            <ForecastGraph location={currLoc} clearLocation={() => setCurrLoc(null)} />
        </div>}
    </section>

}