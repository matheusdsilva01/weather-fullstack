# Weather - Frontend

Dashboard web para visualização de dados climáticos, construída com React e Vite

## Tecnologias Utilizadas
- **React**: Biblioteca para construção de interfaces de usuário
- **Typescript**: Linguagem
- **Vite**: Ferramenta de build rápida para projetos web
- **TanStack Router**: Gerenciamento de rotas
- **TanStack Query**: Gerenciamento de estado de data fetching
- **Tailwind CSS**: Framework CSS utilitário
- **Shadcn UI**: Um conjunto de componentes personalizáveis

## Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
VITE_BACKEND_URL=<URL do backend>
```

## Componente de Desenvolvimento
Arquivos e pastas definidos para estruturar a aplicação:
- **Components**: Componentes reutilizáveis da interface
    - **UI**: Componentes de interface do Shadcn
- **Routes**: Contém os arquivos com páginas e configuração de rotas da aplicação
- **Services**: Defini funções para consumo de API externas
- **Hooks**: Contém hooks personalizados para lógica reutilizável
- **Types**: Definições de tipos das entidades utilizadas na aplicação
- **Lib**: Contém arquivos de bibliotecas e utilitários
- **Context**: Providers para gerenciamento de estado global

## Scripts Disponíveis
```powershell
# Executa projeto localmente na rota: http://localhost:5173, certifique-se de ter criado o arquivo .env (Variáveis de Ambiente)
npm run dev

# Lint
npm run lint

# Build de produção
npm run build

# Executa ambiente de produção
npm run preview
```