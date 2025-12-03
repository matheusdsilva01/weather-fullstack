package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"worker/rabbitmq"

	"github.com/joho/godotenv"
	amqp "github.com/rabbitmq/amqp091-go"
)

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
		failOnError(err, "Failed to marshal weather data")
		return false
	}
	log.Printf("Sending JSON payload: %s", jsonBody)

	req, err := http.NewRequest("POST", url, bytes.NewReader(jsonBody))
	if err != nil {
		failOnError(err, "Failed to create request")
		return false
	}
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		failOnError(err, "Failed to send request")
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

func processMessage(d amqp.Delivery, sender func(Weather) bool) {
	var w Weather
	if err := json.Unmarshal(d.Body, &w); err != nil {
		failOnError(err, "Failed to decode message")
		d.Nack(false, false)
		return
	}
	res := sender(w)

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

func main() {
	err := godotenv.Load()
	if err != nil {
		failOnError(err, "Error loading .env file")
	}
	queueName := "current_weather_queue"

	rabbitmq.NewRabbitMQConnection()

	msgs, err := rabbitmq.RabbitMQClient.ConsumeRabbitMQQueue(queueName)

	if err != nil {
		failOnError(err, "Failed to consume RabbitMQ queue")
	}

	var forever chan struct{}

	go func() {
		for d := range msgs {
			processMessage(d, req_api)
		}
		close(forever)
	}()

	log.Printf(" [*] Waiting for logs. To exit press CTRL+C")
	<-forever
}

func failOnError(err error, msg string) {
	log.Panicf("%s: %s", msg, err)
}
