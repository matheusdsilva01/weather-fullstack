import { api } from "@/lib/api";
import type { Insight } from "@/types/insight";

export const getCurrentWeatherInsights = async () => {
    const response = await api.get<Insight>("/weather/current/insights");
    return response.data;
}