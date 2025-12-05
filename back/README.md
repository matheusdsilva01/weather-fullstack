# Weather - Backend

API RESTful para gerenciamento de dados climáticos, construída com NestJS e MongoDB

## Tecnologias Utilizadas
- **NestJS**: Framework Node.js para construção de aplicações escaláveis
- **MongoDB**: Banco de dados
- **Swagger**: Documentação da API
- **Docker**: Containerização da aplicação

## Features
- **Autenticação JWT**: Registro e login de usuários
- **Gerenciamento de usuários**: CRUD de usuários
- **Visualização de pokemons**: Consumo de API externa para obter dados de pokemons
- **Visualização de dados climáticos**: Endpoints para obter dados e insights climáticos
- **Arquitetura modular**: Separação de funcionalidades por módulos

## Testes
- **Testes e2e**: Todos os fluxos da aplicação estão cobertos por testes end-to-end para cobrir a 
- **Testes unitários**: Controllers possuem testes unitários para garantir a conexão com suas services

## Variáveis de Ambiente
Crie um arquivo `.env` na raiz do diretório `back` com as configurações necessárias

```env
URI=<url de conexão para banco de dados>
JWT_SECRET=<secret para gerar senhas de novos usuários>
RABBITMQ_URL=<URL para o RabbitMQ>
```

## Componentes de Desenvolvimento
Arquivos e pastas definidos para estruturar módulos da aplicação:
- **DTO**: Objetos de Transferência de Dados para validação e tipagem
- **Controllers**: Definem os endpoints da API e manipulam as requisições HTTP
- **Services**: Contêm a lógica de negócio e interagem com o banco de dados
- **Schemas**: Definições dos modelos de dados para o MongoDB
- **Seeds**: Scripts para popular o banco de dados com dados iniciais

## Scripts Disponíveis
```powershell
# Executa a aplicação em modo de desenvolvimento
npm run start:dev

# Build de produção
npm run build

# Executa a aplicação em modo de produção
npm run start:prod

# Executa os testes unitários
npm run test

# Executa os testes e2e
npm run test:e2e

# Lint
npm run lint
```

## Estrutura de banco de dados

```
┌───────────────────────────┐
│           USERS           │
├───────────────────────────┤
│ _id: ObjectId             │
│ username: string          │
│ password: string          │
│ email: string             │
│ createdAt: Date           │
│ updatedAt: Date           │
└───────────────────────────┘

┌──────────────────────────────────────────────┐
│                   WEATHERS                   │
├──────────────────────────────────────────────┤
│ _id: ObjectId                                │
│ longitude: number                            │
│ latitude: number                             │
│ temperature: number                          │
│ time: string                                 │
│ wind_speed: number                           │
│ wind_direction: number                       │
│ wind_gusts: number                           │
│ apparent_temperature: number                 │
│ precipitation: number                        │
│ cloud_cover: number                          │
│ relative_humidity: number                    │
│ weather_code: number                         │
└──────────────────────────────────────────────┘
```