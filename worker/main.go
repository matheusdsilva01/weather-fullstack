package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

type Weather struct {
	Latitude            float64 `json:"latitude"`
	Longitude           float64 `json:"longitude"`
	Temperature         float64 `json:"temperature"`
	Time                string  `json:"time"`
	WindSpeed           float64 `json:"wind_speed"`
	WindDirection       float64 `json:"wind_direction"`
	WindGusts           float64 `json:"wind_gusts"`
	ApparentTemperature float64 `json:"apparent_temperature"`
	Precipitation       float64 `json:"precipitation"`
	CloudCover          float64 `json:"cloud_cover"`
	RelativeHumidity    float64 `json:"relative_humidity"`
	WeatherCode         int     `json:"weather_code"`
}

func req_api(w Weather) bool {
	url := os.Getenv("BACKEND_URL") + "/weather"
	jsonBody, err := json.Marshal(w)

	if err != nil {
		log.Printf("Failed to marshal weather data: %s", err)
		return false
	}
	log.Printf("Sending JSON payload: %s", jsonBody)

	req, err := http.NewRequest("POST", url, bytes.NewReader(jsonBody))
	if err != nil {
		log.Printf("Failed to create request: %s", err)
		return false
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		log.Printf("Failed to send request: %s", err)
		return false
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		log.Printf("Failed to post weather data: status code %d", resp.StatusCode)
		return false
	}
	log.Printf("Successfully posted weather data: %+v", w)
	return true
}

func main() {
	conn, err := amqp.Dial(os.Getenv("RABBITMQ_CONNECTION_URL"))
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	err = ch.ExchangeDeclare(
		"weather", // name
		"direct",  // type
		false,     // durable
		false,     // auto-deleted
		false,     // internal
		false,     // no-wait
		nil,       // arguments
	)
	failOnError(err, "Failed to declare an exchange")

	q, err := ch.QueueDeclare(
		"current_weather_queue", // name
		false,                   // durable
		false,                   // delete when unused
		false,                   // exclusive
		false,                   // no-wait
		nil,                     // arguments
	)
	failOnError(err, "Failed to declare a queue")

	err = ch.QueueBind(
		q.Name,                  // queue name
		"current_weather_queue", // routing key
		"weather",               // exchange
		false,
		nil,
	)
	failOnError(err, "Failed to bind a queue")

	err = ch.Qos(
		1,     // prefetch count
		0,     // prefetch size
		false, // global
	)
	failOnError(err, "Failed to set QoS")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		false,  // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	var forever chan struct{}

	go func() {
		for d := range msgs {
			var w Weather
			if err := json.Unmarshal(d.Body, &w); err != nil {
				log.Printf("Failed to decode message: %s", err)
				d.Nack(false, false)
				continue
			}
			res := req_api(w)

			if res {
				d.Ack(false)
			} else {
				if d.Redelivered {
					d.Reject(false)
				} else {
					d.Nack(false, true)
				}
			}
		}
		close(forever)
	}()

	log.Printf(" [*] Waiting for logs. To exit press CTRL+C")
	<-forever
}
