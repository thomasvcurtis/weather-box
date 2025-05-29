export async function realtimeWeather(location: string) {
  if (!process.env.TOMORROWIO_API_KEY) {
    throw new Error("TOMORROWIO_API_KEY is not configured");
  }

  const baseUrl = "https://api.tomorrow.io/v4/weather/realtime";
  const url = `${baseUrl}?location=${location}&apikey=${process.env.TOMORROWIO_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Weather API error: ${response.status} - ${errorText}`);
  }
  return response.json();
}
