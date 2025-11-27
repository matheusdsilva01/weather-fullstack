import { CardsWeather } from '@/components/cards-weather'
import { ExportWeatherData } from '@/components/export-weather-data'
import { WeatherInsights } from '@/components/weather-insights'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <div className='flex h-full'>
      <div className='w-full p-4'>
        <div className='mb-8 flex flex-col justify-between sm:flex-row'>
          <h1 className='text-4xl font-bold text-zinc-900'>Clima App</h1>
          <ExportWeatherData />
        </div>
        <CardsWeather />
        <div className='mt-4'>
          <WeatherInsights />
        </div>
      </div>
    </div>
  )
}
