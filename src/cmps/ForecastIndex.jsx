import { useState } from "react"
import { getLocations } from "../service"
import { ForecastGraph } from "./ForecastGraph"


export function ForecastIndex() {
    const [currLoc, setCurrLoc] = useState(null)
    const locations = getLocations()
    return <section className="forecast-index" >
        <div className="locations-list">
            {locations.map(location => {
                return <div className="location-item" onClick={() => setCurrLoc(location)}>
                    <h3>{location.city}</h3>
                    <h4>{location.country}</h4>
                </div>
            })}

        </div>
        <button onClick={() => setCurrLoc(null)}>Clear</button>

        {currLoc && <ForecastGraph location={currLoc} />}
    </section>

}