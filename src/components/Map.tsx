import { useRef, useEffect, useState } from "react";
import mapboxgl, { Map, LngLatLike } from "mapbox-gl";

const INITIAL_CENTER: [number, number] = [-83.6448, 41.3703];
const INITIAL_ZOOM = 10.12;

export default function MapBox() {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center as LngLatLike,
      zoom: zoom,
    });

    mapRef.current.on("move", () => {
      if (!mapRef.current) return;
      const mapCenter = mapRef.current.getCenter();
      const mapZoom = mapRef.current.getZoom();

      setCenter([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <>
      <div className="h-full w-full absolute" ref={mapContainerRef} />
    </>
  );
}
