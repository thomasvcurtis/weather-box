import { useMutation } from '@tanstack/react-query'
import fetchWeather from "../actions/weather"

export default function useWeather() {
    return useMutation({
        mutationFn: (coordinates: string) => fetchWeather(coordinates)
    })
}