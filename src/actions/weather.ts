import { baseUrl } from "../../lib/baseUrl";

export default async function fetchWeather(coordinates: string) {
  try {
    const response = await fetch(
      `${baseUrl}/weather/${encodeURIComponent(coordinates)}`
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch weather: ${response.status} - ${errorText}`
      );
    }
    return response.json();
  } catch (err) {
    console.error("Weather fetch error:", err);
    throw err;
  }
}
