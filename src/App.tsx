import MapBox from "./components/Map";
import WeatherDisplay from "./components/WeatherDisplay";

function App() {
  return (
    <div className="p-4 min-h-screen flex flex-col">
      <h1 className="text-center text-2xl font-bold mb-4">Weather Box</h1>
      <div className="flex flex-row gap-4">
        <div className="w-3/4 h-[calc(100vh-8rem)] border-2 rounded-md">
          <MapBox />
        </div>
        <div className="w-1/4 h-[calc(100vh-8rem)] border-2 rounded-md">
          <WeatherDisplay />
        </div>
      </div>
    </div>
  );
}

export default App;
