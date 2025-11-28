import json
import time
from dotenv import load_dotenv
import requests
import schedule
from rabbitmq import RabbitMQ

def req_api():
    api_url = "https://api.open-meteo.com/v1/forecast?latitude=-2.569&longitude=-44.242&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature,precipitation,cloud_cover,relative_humidity_2m,weather_code"
    try:
        response = requests.get(api_url)
        if response.status_code == 200:

            data = response.json()
            formattedData = {
                "latitude": data.get("latitude"),
                "longitude": data.get("longitude"),
                "temperature": data.get("current").get("temperature_2m"),
                "time": data.get("current").get("time"),
                "wind_speed": data.get("current").get("wind_speed_10m"),
                "wind_direction": data.get("current").get("wind_direction_10m"),
                "wind_gusts": data.get("current").get("wind_gusts_10m"),
                "apparent_temperature": data.get("current").get("apparent_temperature"),
                "precipitation": data.get("current").get("precipitation"),
                "cloud_cover": data.get("current").get("cloud_cover"),
                "relative_humidity": data.get("current").get("relative_humidity_2m"),
                "weather_code": data.get("current").get("weather_code")
            }
            return formattedData
        else:
            print(f"Error: GET request failed with status code {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred during the GET request: {e}")

def publish_current_weather():
    rabbitmq = RabbitMQ()

    try:
        data = req_api()
        rabbitmq.queue_declare('current_weather_queue').exchange_declare('weather', 'direct').publish(queue_name='current_weather_queue', message=json.dumps(data))
        print("Message published successfully.")
    except Exception as e:
        print(f"Failed to publish test message: {e}")
    finally:
        rabbitmq.close()

schedule.every(1).minute.do(publish_current_weather)
print("Running scheduled task...")


if __name__ == "__main__":
    load_dotenv()
    publish_current_weather()
    while True:
        schedule.run_pending()
        time.sleep(1)