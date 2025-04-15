import { useState } from "react"
import { getLocations } from "../service"
import { ForecastGraph } from "./ForecastGraph"
import { ForecastList } from "./MUI cmps/ForecastList"


export function ForecastIndex() {
    const [currLoc, setCurrLoc] = useState(null)
    
    return <section className="forecast-index" >
        <ForecastList currLoc={currLoc} setCurrLoc={setCurrLoc} />
        
        <button onClick={() => setCurrLoc(null)}>Clear</button>

        {currLoc && <ForecastGraph location={currLoc} />}
    </section>

}