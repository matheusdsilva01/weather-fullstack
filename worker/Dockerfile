FROM golang:alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN go build -o worker .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/worker .

CMD ["./worker"]
