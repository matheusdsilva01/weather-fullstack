import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchCurrentWeather } from '@/services/weather'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Cloud, Wind } from 'lucide-react'

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: weather, isLoading } = useQuery({
    queryKey: ['current-weather'],
    queryFn: fetchCurrentWeather,
  })

  return (
    <div className="flex h-full">
      <div className="w-full p-4">
        <h1 className="mb-8 text-4xl font-bold text-zinc-900">Clima App</h1>
        <span className="mb-4 block text-sm text-zinc-500">
          Ultima atualização: {weather ? new Date(weather.time).toLocaleString() : 'N/A'}
        </span>
        {isLoading ? (
          <div className="text-center text-zinc-500">Carregando dados do clima...</div>
        ) : weather ? (
          <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-3'>
            <Card>
              <CardHeader className="grid-cols-2">
                <CardTitle>Clima atual</CardTitle>
                <Cloud className="ml-auto text-zinc-400" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Temperatura:</span>
                  <span>{weather.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Sensação Térmica:</span>
                  <span>{weather.apparent_temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Localização:</span>
                  <span>{weather.latitude.toFixed(2)}, {weather.longitude.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='grid-cols-2'>
                <CardTitle>Vento</CardTitle>
                <Wind className="ml-auto text-zinc-400" />
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Velocidade:</span>
                  <span>{weather.wind_speed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Direção:</span>
                  <span>{weather.wind_direction}°</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Rajadas:</span>
                  <span>{weather.wind_gusts} km/h</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center text-red-500">Não foi possível carregar os dados do clima.</div>
        )}
      </div>
    </div>
  )
}