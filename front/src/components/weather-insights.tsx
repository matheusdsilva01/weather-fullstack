import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentWeatherInsights } from "@/services/current-weather-insights";
import { useQuery } from "@tanstack/react-query";
import { Lightbulb } from "lucide-react";

export function WeatherInsights() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["insights"],
    queryFn: getCurrentWeatherInsights,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="grid-cols-2">
          <CardTitle className="font-medium">Insights do clima</CardTitle>
          <Skeleton className="ml-auto h-4 w-4 rounded-full" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Não foi possível carregar os insights do clima.</div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="grid-cols-2">
        <CardTitle className="font-medium">Insights do clima</CardTitle>
        <Lightbulb className="ml-auto h-4 w-4 text-yellow-500" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="font-medium">Vento:</p>
          <p>{data.wind}</p>
        </div>
        <div className="space-y-1">
          <p className="font-medium">Clima:</p>
          <p>{data.weather}</p>
        </div>
      </CardContent>
    </Card>
  );
}
