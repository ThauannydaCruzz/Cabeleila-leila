# Cabeleleila Leila — Sistema de Agendamento

Sistema web para gerenciamento de agendamentos do Salão da Leila. Permite que clientes façam agendamentos online e que a administradora gerencie os atendimentos pelo painel admin.

🎥 [Assistir vídeo do projeto rodando](https://vimeo.com/1201937153?share=copy&fl=sv&fe=ci)

---

## Requisitos atendidos

### Cliente
- Cadastro e login com e-mail e senha
- Validação de senha no login (admin e clientes)
- Agendamento de um ou mais serviços
- Alteração de agendamento até 2 dias antes da data marcada
- Quando faltar menos de 2 dias, exibe o telefone do salão para contato
- Sugestão de usar a mesma data ao agendar na mesma semana de um agendamento existente
- Histórico de agendamentos com data, serviços, observação e situação

### Administrador
- Dashboard com resumo de agendamentos por situação
- Filtro de agendamentos por período (data de início e fim)
- Visualização de todos os agendamentos com nome do cliente
- Confirmação de agendamento via botão
- Edição de data, horário e observação de qualquer agendamento
- Histórico geral de todos os atendimentos

---

## Tecnologias

### Frontend
- React 18 + TypeScript
- Vite
- React Router DOM v7
- CSS puro

### Backend
- ASP.NET Core (.NET 9)
- Entity Framework Core
- Npgsql (PostgreSQL)

### Banco de dados
- Supabase (PostgreSQL)

---

## Arquitetura

O backend segue a arquitetura **MVC simples**, sem camadas desnecessárias:

- `Domain/` — entidades do domínio (`Cliente`, `Agendamento`, `Servico`)
- `Data/` — contexto do banco de dados com Entity Framework Core
- `Api/Controllers/` — controllers com validações de entrada e acesso direto ao contexto

Essa abordagem foi escolhida por ser direta, fácil de entender e adequada ao tamanho do projeto.

---

## Testes

O projeto inclui testes unitários no backend utilizando **xUnit** e banco de dados **InMemory** (sem dependência de banco real).

São 9 testes cobrindo as validações dos 3 controllers:

- `ClienteController` — nome vazio, e-mail inválido, dados válidos
- `AgendamentoController` — data no passado, sem serviços, dados válidos
- `ServicoController` — nome vazio, preço zero, dados válidos

Para rodar:

```bash
cd backend
dotnet test
```

---

## Estrutura do projeto

```
cabeleleila-leila/
├── frontend/        # Aplicação React
│   └── src/
│       ├── components/   # LayoutAdmin, LayoutCliente
│       ├── context/      # Autenticação (AuthContext)
│       ├── pages/        # Login, Cadastro, Dashboard, Agendamentos, Histórico
│       │   └── cliente/  # MeusAgendamentos, MeuHistorico
│       ├── routes/       # AppRoutes
│       ├── services/     # api.ts (integração com backend)
│       └── utils/        # situacoes.ts (mapeamento de status)
└── backend/
    ├── Api/         # Controllers e Program.cs
    ├── Data/        # DbContext
    ├── Domain/      # Entidades
    └── Tests/       # Testes unitários (xUnit)
```

---

## Acesso admin

| Campo | Valor |
|-------|-------|
| E-mail | admin@salao.com |
| Senha | admin123 |

---

## Como rodar

### Pré-requisitos
- Node.js 18+
- .NET 9 SDK

### Backend

```bash
cd backend/Api
dotnet run
```

A API ficará disponível em `http://localhost:5233`.

Na primeira execução, o sistema cria automaticamente as tabelas no banco e popula o catálogo de serviços.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend ficará disponível em `http://localhost:5173`.

---

## Banco de dados

O projeto utiliza Supabase (PostgreSQL). A connection string está configurada em `backend/Api/appsettings.json`.

As tabelas utilizadas são:

- `Clientes` — dados dos clientes cadastrados
- `Agendamentos` — agendamentos com status e observação
- `Servicos` — catálogo de serviços e cópias vinculadas a cada agendamento

---

## Status dos agendamentos

| Código | Descrição |
|--------|-----------|
| 1 | Pendente |
| 2 | Confirmado |
| 3 | Concluído |
| 4 | Cancelado |
