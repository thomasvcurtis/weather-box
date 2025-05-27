import { useAtom } from "jotai";
import { MapCoordinate } from "../atoms/MapboxState";

export default function CoordinateViewer() {
  const [coordinates] = useAtom(MapCoordinate);

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-medium">Longitude: </span>
          <span>{coordinates[0].toFixed(4)}°</span>
        </div>
        <div>
          <span className="font-medium">Latitude: </span>
          <span>{coordinates[1].toFixed(4)}°</span>
        </div>
      </div>
    </div>
  );
}
