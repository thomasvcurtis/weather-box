import { realtimeWeather } from "../repository/tomorrowioRepository";

export async function getRealtimeWeather(location:string) {
    return realtimeWeather(location)
}