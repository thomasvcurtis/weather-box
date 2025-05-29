import { RequestHandler } from "express";
import { getRealtimeWeather } from "../service/tomorrowioService";

interface WeatherParams {
  coordinates: string;
}

export const realtimeWeather: RequestHandler<WeatherParams> = async (
  req,
  res
) => {
  const { coordinates } = req.params;

  if (!coordinates || typeof coordinates !== "string") {
    res.status(400).json({
      message: "Coordinates are required",
    });
    return;
  }

  const weatherData = await getRealtimeWeather(coordinates);
  res.status(200).json(weatherData);
};
