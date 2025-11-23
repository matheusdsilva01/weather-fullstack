import type { Weather } from "@/types/weather";

export const fetchCurrentWeather = async (): Promise<Weather | null> => {
    try {
        const response = await fetch("http://localhost:3000/weather/current");
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};
