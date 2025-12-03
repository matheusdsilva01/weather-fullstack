package rabbitmq

import (
	"testing"

	"github.com/joho/godotenv"
)

func TestConnectionRabbitMQ(t *testing.T) {
	err := godotenv.Load("../.env")
	if err != nil {
		failOnError(err, "Error loading .env file")
	}

	NewRabbitMQConnection()

	if RabbitMQClient.Conn == nil || RabbitMQClient.Conn.IsClosed() {
		t.Errorf("Expected RabbitMQ connection to be established")
	}

	RabbitMQClient.CloseConnection()
	if !RabbitMQClient.Conn.IsClosed() {
		t.Errorf("Expected RabbitMQ connection to be closed")
	}
}

func TestConsumeRabbitMQQueue(t *testing.T) {
	err := godotenv.Load("../.env")
	if err != nil {
		failOnError(err, "Error loading .env file")
	}
	NewRabbitMQConnection()
	queueName := "test_queue"

	msgs, err := RabbitMQClient.ConsumeRabbitMQQueue(queueName)
	if err != nil {
		t.Errorf("Expected to consume RabbitMQ queue without error, got: %v", err)
	}

	if msgs == nil {
		t.Errorf("Expected msgs channel to be non-nil")
	}
}
