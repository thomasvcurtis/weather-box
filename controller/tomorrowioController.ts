import { getRealtimeWeather } from "../lib/service/tomorrowioService";
import { Request, Response } from "express";
export async function realtimeWeather(req: Request, res: Response) {
  const { location} = req.query;

  if (!location || typeof location !== 'string') {
    return res.status(400).json({ 
      message: 'Location is required' 
    });
  }

  const weatherData = await getRealtimeWeather(location);
  return res.status(200).json(weatherData);
}
