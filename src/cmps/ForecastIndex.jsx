import { getLocations } from "../service"


export function ForecastIndex() {
    const locations = getLocations()
    return <section className="forecast-index" >
        <div className="locations-list">
            {locations.map(location => {
                return <div className="location-item">
                    <h3>{location.city}</h3>
                    <h4>{location.country}</h4>
                </div>
            })}

        </div>
    </section>

}