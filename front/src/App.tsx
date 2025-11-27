import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { fetchCurrentWeather } from '@/services/weather'
import { useQuery } from '@tanstack/react-query'

function App() {
  const { data: weather, isLoading } = useQuery({
    queryKey: ['current-weather'],
    queryFn: fetchCurrentWeather
  })

  return (
    <div className='flex h-screen items-center justify-center bg-zinc-50'>
      <div className='w-full max-w-md p-4'>
        <h1 className='mb-8 text-center text-4xl font-bold text-zinc-900'>
          Clima App
        </h1>

        {isLoading ? (
          <div className='text-center text-zinc-500'>
            Carregando dados do clima...
          </div>
        ) : weather ? (
          <Card>
            <CardHeader>
              <CardTitle>Clima atual</CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='flex justify-between'>
                <span className='font-medium'>Temperatura:</span>
                <span>{weather.temperature}°C</span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Localização:</span>
                <span>
                  {weather.latitude.toFixed(2)}, {weather.longitude.toFixed(2)}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='font-medium'>Data:</span>
                <span>{new Date(weather.time).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className='text-center text-red-500'>
            Não foi possível carregar os dados do clima.
          </div>
        )}
      </div>
    </div>
  )
}

export default App
