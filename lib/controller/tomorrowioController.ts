import { getRealtimeWeather } from "../service/tomorrowioService";

export async function realtimeWeather(req, res) {
  const { location } = req.query;

  if (!location || typeof location !== "string") {
    return res.status(400).json({
      message: "Location is required",
    });
  }

  const weatherData = await getRealtimeWeather(location);
  return res.status(200).json(weatherData);
}
