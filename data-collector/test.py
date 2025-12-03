import os
from dotenv import load_dotenv
import pika
from rabbitmq import RabbitMQ

def test_rabbitmq_connection():
    load_dotenv()
    rabbitmq = RabbitMQ()
    assert rabbitmq.connection.is_open
    rabbitmq.close()

def test_rabbitmq_message_publish():
    load_dotenv()
    rabbitmq = RabbitMQ()
    queue_name = 'test_queue'
    exchange_name = 'test_exchange'
    data = "test message"

    rabbitmq.queue_declare(queue_name=queue_name)
    rabbitmq.exchange_declare(exchange_name=exchange_name, exchange_type='direct')
    rabbitmq.queue_bind(queue_name=queue_name, exchange_name=exchange_name, routing_key=queue_name)
    rabbitmq.publish(queue_name=queue_name, message=data, exchange_name=exchange_name)
    rabbitmq.close()

    # conecta pra verificar se a msg chegou
    credentials = pika.PlainCredentials(os.getenv('RABBITMQ_USER'), os.getenv('RABBITMQ_PASSWORD'))
    parameters = pika.ConnectionParameters(host="localhost", port=5672, credentials=credentials)

    connection = pika.BlockingConnection(parameters)
    channel = connection.channel()

    method, properties, body = channel.basic_get(queue=queue_name, auto_ack=True)
    assert body is not None
    assert body.decode() == data
