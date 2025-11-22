package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"

	amqp "github.com/rabbitmq/amqp091-go"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}

type Weather struct {
	Latitude           float64 `json:"latitude"`
	Longitude          float64 `json:"longitude"`
	CurrentTemperature float64 `json:"current_temperature"`
	Time               string  `json:"time"`
}

func req_api(w Weather) {
	url := "http://localhost:3000/weather"
	jsonBody, err := json.Marshal(w)

	if err != nil {
		failOnError(err, "Failed to marshal weather data")
	}

	req, err := http.NewRequest("POST", url, bytes.NewReader(jsonBody))
	req.Header.Set("Content-Type", "application/json")

	if err != nil {
		failOnError(err, "Failed to create request")
	}

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		failOnError(err, "Failed to send request")
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		failOnError(err, "Failed to post weather data")
	}
}

func main() {
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
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
		"weather_queue", // name
		false,           // durable
		false,           // delete when unused
		false,           // exclusive
		false,           // no-wait
		nil,             // arguments
	)
	failOnError(err, "Failed to declare a queue")

	err = ch.QueueBind(
		q.Name,          // queue name
		"weather_queue", // routing key
		"weather",       // exchange
		false,
		nil,
	)
	failOnError(err, "Failed to bind a queue")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
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
				continue
			}
			req_api(w)
		}
		close(forever)
	}()

	log.Printf(" [*] Waiting for logs. To exit press CTRL+C")
	<-forever
}
