import { api } from '@/lib/api'
import type { Weather } from '@/types/weather'

export const fetchCurrentWeather = async (): Promise<Weather | null> => {
  const response = await api.get<Weather>('/weather/current')
  return response.data
}
