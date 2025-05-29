import { useAtom } from "jotai";
import { MapCoordinate } from "../atoms/MapboxState";
import useWeather from "../hooks/useWeather";

export default function WeatherDisplay() {
  const [coordinates] = useAtom(MapCoordinate);
  const { 
    mutate: fetchWeather, 
    data: weatherData, 
    isPending, 
    isError,
    error
  } = useWeather();

  const handleFetchWeather = () => {
    // Format coordinates as "latitude,longitude"
    const coordString = `${coordinates[1]},${coordinates[0]}`;
    fetchWeather(coordString);
  };

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleString();
  };

  const getWeatherDescription = (code: number) => {
    // Basic weather code mapping
    const weatherCodes: { [key: number]: string } = {
      1000: "Clear",
      1100: "Mostly Clear",
      1101: "Partly Cloudy",
      1102: "Mostly Cloudy",
      1001: "Cloudy",
      2000: "Fog",
      4000: "Rain",
      4001: "Light Rain",
      5000: "Snow",
      5001: "Light Snow",
    };
    return weatherCodes[code] || "Unknown";
  };

  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-4">Weather Information</h2>
      <button 
        onClick={handleFetchWeather}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Get Weather
      </button>
      
      {isPending && <p>Loading weather data...</p>}
      {isError && (
        <p className="text-red-500">
          Error fetching weather data: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      )}
      
      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Current Conditions</h3>
            <div className="space-y-2">
              <div className="text-3xl font-bold">
                {weatherData.data.values.temperature}°C
              </div>
              <div>Feels like: {weatherData.data.values.temperatureApparent}°C</div>
              <div className="text-lg">
                {getWeatherDescription(weatherData.data.values.weatherCode)}
              </div>
              <div>Updated: {formatTime(weatherData.data.time)}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Atmosphere</h3>
            <div className="space-y-2">
              <div>Humidity: {weatherData.data.values.humidity}%</div>
              <div>Dew Point: {weatherData.data.values.dewPoint}°C</div>
              <div>Pressure: {weatherData.data.values.pressureSeaLevel} hPa</div>
              <div>Visibility: {weatherData.data.values.visibility} km</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Wind</h3>
            <div className="space-y-2">
              <div>Speed: {weatherData.data.values.windSpeed} m/s</div>
              <div>Gust: {weatherData.data.values.windGust} m/s</div>
              <div>Direction: {weatherData.data.values.windDirection}°</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Sky Conditions</h3>
            <div className="space-y-2">
              <div>Cloud Cover: {weatherData.data.values.cloudCover}%</div>
              <div>Cloud Base: {weatherData.data.values.cloudBase} km</div>
              <div>Cloud Ceiling: {weatherData.data.values.cloudCeiling} km</div>
              <div>UV Index: {weatherData.data.values.uvIndex}</div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Precipitation</h3>
            <div className="space-y-2">
              <div>Probability: {weatherData.data.values.precipitationProbability}%</div>
              <div>Rain Intensity: {weatherData.data.values.rainIntensity} mm/hr</div>
              <div>Snow Intensity: {weatherData.data.values.snowIntensity} mm/hr</div>
              <div>Sleet Intensity: {weatherData.data.values.sleetIntensity} mm/hr</div>
              <div>Freezing Rain: {weatherData.data.values.freezingRainIntensity} mm/hr</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}