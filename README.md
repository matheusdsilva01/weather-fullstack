# ☁️ Weather - Monitoramento Climático

## Proposta
Este é um projeto de monitoramento climático para fornecer informações atualizadas sobre o clima em determinada região. Construído sobre uma arquitetura de microsserviços oferecendo escalabilidade e facilidade de manutenção

## Features
- Consulta de clima atual
- Insights climáticos

## Tecnologias Utilizadas
#### Backend:
- **NestJS**: Framework Node.js para construção de aplicações escaláveis e eficientes
- **MongoDB**: Banco de dados primário
- **Typescript**: Linguagem
- **RabbitMQ**: Gerenciamento de filas

#### Frontend:
- **React**: Biblioteca JavaScript para construção de interfaces de usuário
- **Tailwind CSS**: Framework CSS focado em utilidade
- **Vite**: Ferramenta de build para web
- **Tanstack (Router, Query)**: Utilitários para projetos web
- **Typescript**: Linguagem

#### Data Collector:
- **Python**: Linguagem
- **Features**:
    - Coleta de dados climáticos de APIs externas

#### Worker:
- **Go**: Linguagem
- **Features**:
    - Processamento e encaminhamento de dados coletados de filas

#### Infraestrutura:
- **Docker**: Containerização

#### Executar projeto localmente:
Para executar o projeto localmente, você pode utilizar o Docker Compose 
para criar os containers dos serviços usando o comando `docker compose up --build -d` ou seguir as instruções em cada README dos serviços.

#### Fluxo de Dados:

```
┌──────────────────┐     ┌────────────────┐     ┌──────────────────┐
│   Coleta dados   │     │   Envia para   │     │  Coleta e        │
│   do clima       │────►│   fila         │────►│  envia para API  │
└──────────────────┘     └────────────────┘     └──────────────────┘
                                                      │
                                                      ▼
            ┌──────────────────┐     ┌──────────────────┐
            │ Mostra os dados  │◄────│  Salva no        │
            │ para o usuário   │     │  Banco de dados  │
            └──────────────────┘     └──────────────────┘
```
