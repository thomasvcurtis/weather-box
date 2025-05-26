import MapBox from "./components/Map";
import CoordinateViewer from "./components/CoordinateViewer";

function App() {
  return (
    <div className="p-4 min-h-screen flex flex-col">
      <h1 className="text-center text-2xl font-bold mb-4">Weather Box</h1>
      <div className="flex flex-row gap-4 flex-1">
        <div className=" w-3/4 flex-1 border-2 rounded-md">
          <MapBox />
        </div>
        <div>
          <CoordinateViewer />
        </div>
      </div>
    </div>
  );
}

export default App;
