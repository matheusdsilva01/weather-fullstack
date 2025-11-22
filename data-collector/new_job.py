import pika, time, schedule, requests, json

def req_api():
    api_url = "https://api.open-meteo.com/v1/forecast?latitude=-2.569&longitude=-44.242&current=temperature_2m"
    try:
        response = requests.get(api_url)
        if response.status_code == 200:

            data = response.json()
            formattedData = {
                "latitude": data.get("latitude"),
                "longitude": data.get("longitude"),
                "current_temperature": data.get("current").get("temperature_2m")
            }
            return formattedData
        else:
            print(f"Error: GET request failed with status code {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"An error occurred during the GET request: {e}")


def send_job():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    channel.exchange_declare(exchange='weather', exchange_type='direct')

    channel.queue_declare(queue='weather_queue')

    data = req_api()
    message = json.dumps(data)
    channel.basic_publish(exchange='weather',
                        routing_key='weather_queue',
                        body=message,
                        properties=pika.BasicProperties(
                            content_type='application/json',
                        ))
    print(f" [x] Sent {message} at {time.strftime('%Y-%m-%d %H:%M:%S')}")
    connection.close()

send_job()
schedule.every(15).seconds.do(send_job)
print("Running scheduled task...")

while True:
    schedule.run_pending()
    time.sleep(1)

