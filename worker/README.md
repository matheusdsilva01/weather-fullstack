# Weather - Worker

Aplicação para processamento e encaminhamento de dados coletados de filas para o API.

## Tecnologias Utilizadas
- **Go**: Linguagem
- **RabbitMQ**: Fila

## Features
- **Consumo de filas**: Consumo de filas no RabbitMQ
- **Envio de dados para API**: Envio de dados coletados para API

## Testes
Possui testes de integração para validar conexão e consumo de filas no RabbitMQ.
Para executar os testes, execute o comando no terminal:
```powershell
go test ./...
```

## Variáveis de Ambiente
Crie um arquivo `.env` na raiz do diretório `worker` com as configurações necessárias.

```env
# Variáveis de ambiente para configuração do ambiente
RABBITMQ_CONNECTION_URL=<URL para o RabbitMQ>
BACKEND_URL=<URL para o backend>
```
```env
#exemplo
RABBITMQ_CONNECTION_URL="amqp://guest:guest@localhost:5672/"
BACKEND_URL=http://localhost:3000
```

## Scripts Disponíveis
```powershell
# Executa o worker
go run main.go
```
