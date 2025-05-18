export async function realtimeWeather(location: string) {
  const baseUrl = "https://api.tomorrow.io/v4/weather/realtime";
  const url = `${baseUrl}?location=${encodeURIComponent(
    location
  )}&apikey=${process.env.TOMORROWIO_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Weather API error: ${response.status} - ${response.statusText}`
    );
  }
  return response.json();
}
