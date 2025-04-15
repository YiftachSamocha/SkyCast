import { useState } from "react"
import { getLocations } from "../service"
import { ForecastGraph } from "./ForecastGraph"
import { ForecastList } from "./MUI cmps/ForecastList"
import ForecastHeader from "./MUI cmps/ForecastHeader"


export function ForecastIndex() {
    const [currLoc, setCurrLoc] = useState(null)

    return <section className="forecast-index" >
        <ForecastHeader clearLocation={() => setCurrLoc(null)} />
        <ForecastList currLoc={currLoc} setCurrLoc={setCurrLoc} />

        <button onClick={() => setCurrLoc(null)}>Clear</button>

        {currLoc && <ForecastGraph location={currLoc} />}
    </section>

}