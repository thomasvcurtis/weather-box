import { useRef, useEffect, useState } from 'react'
import mapboxgl, { Map, LngLatLike } from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

const INITIAL_CENTER: [number, number] = [
  -74.0242,
  40.6941
]
const INITIAL_ZOOM = 10.12

function App() {
  const mapRef = useRef<Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER)
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM)

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center as LngLatLike,
      zoom: zoom
    });

    mapRef.current.on('move', () => {
      if (!mapRef.current) return;
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()

      setCenter([mapCenter.lng, mapCenter.lat])
      setZoom(mapZoom)
    })

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  return (
    <>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <div id='map-container' ref={mapContainerRef} />
    </>
  )
}

export default App