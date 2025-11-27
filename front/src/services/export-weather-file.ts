import { api } from '@/lib/api'

export async function exportWeatherFile(format: 'csv' | 'xlsx') {
  const response = await api.get(`/weather/export?format=${format}`, {
    responseType: 'blob'
  })
  return {
    filename:
      response.headers['content-disposition'].split('filename=')[1] ||
      `weather.${format}`,
    blob: response.data
  }
}
