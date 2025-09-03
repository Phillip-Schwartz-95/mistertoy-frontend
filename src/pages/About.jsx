import { APIProvider, Map, AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'
import { useState } from 'react'

const API_KEY = 'AIzaSyAYw9vaCHVbdERyNPyu9G1xH_9C7bCK-gw'

const branches = [
  { name: 'Downtown', lat: 32.0853, lng: 34.7818 },
  { name: 'Uptown', lat: 32.085, lng: 34.79 }
]

export default function About() {
  const [mapRef, setMapRef] = useState(null)

  return (

      <section>
        <h1>Our Branches</h1>
        <div>
          {branches.map((b, i) => (
            <button
              key={i}
              onClick={() => {
                if (mapRef) {
                  mapRef.panTo({ lat: b.lat, lng: b.lng })
                }
              }}
            >
              {b.name}
            </button>
          ))}
        </div>

        <APIProvider apiKey={API_KEY}>
          <Map
            onLoad={map => setMapRef(map)}
            defaultCenter={{ lat: 32.0853, lng: 34.7818 }}
            defaultZoom={12}
            style={{ width: '100%', height: '400px' }}
          >
            {branches.map((b, i) => (
              <AdvancedMarker key={i} position={{ lat: b.lat, lng: b.lng }} />
            ))}
          </Map>
        </APIProvider>
      </section>
  )
}
