# Weather - Data collector

Aplicação para coleta de dados climáticos a partir da API da [OpenMeteo](https://open-meteo.com).

## Tecnologias Utilizadas
- **Python**: Linguagem
- **Requests**: Biblioteca para requisições HTTP
- **Schedule**: Biblioteca para agendamento de tarefas
- **RabbitMQ**: Fila

## Features
- **Agendamento de coleta de dados**: Coleta de dados climáticos a partir da API da OpenMeteo
- **Envio de dados para fila RabbitMQ**: Envio de dados coletados para fila RabbitMQ

## Testes
Possui testes de integração para validar conexão e envio de dados para filas no RabbitMQ.

## Variáveis de Ambiente
Crie um arquivo `.env` na raiz do diretório `data-collector` com as configurações necessárias.

```env
# Variáveis de ambiente para conexão com RabbitMQ
RABBITMQ_USER=<user rabbitmq>
RABBITMQ_PASSWORD=<password rabbitmq>
RABBITMQ_HOST=<host rabbitmq>
RABBITMQ_PORT=<port rabbitmq>
```

## Scripts Disponíveis
```powershell
# Executa o publisher de dados para fila RabbitMQ
py publisher.py
```
