import { useRef, useEffect, useState } from "react";
import mapboxgl, { Map, LngLatLike } from "mapbox-gl";
import { useAtom } from "jotai";
import { MapZoom, MapCoordinate } from "../atoms/MapboxState";

export default function MapBox() {
  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const [coordinates, setCoordinates] = useAtom(MapCoordinate);
  const [center, setCenter] = useState<[number, number]>(coordinates);
  const [zoom, setZoom] = useAtom(MapZoom);

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

      // Update both local and global state
      setCenter([mapCenter.lng, mapCenter.lat]);
      setCoordinates([mapCenter.lng, mapCenter.lat]);
      setZoom(mapZoom);
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div className="w-full h-full" ref={mapContainerRef} />
  );
}
