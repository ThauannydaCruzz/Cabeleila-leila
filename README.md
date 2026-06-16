# Cabeleleila Leila — Sistema de Agendamento

Sistema web para gerenciamento de agendamentos do Salão da Leila. Permite que clientes façam agendamentos online e que a administradora gerencie os atendimentos pelo painel admin.

---

## Requisitos atendidos

### Cliente
- Cadastro e login com e-mail e senha
- Agendamento de um ou mais serviços
- Alteração de agendamento até 2 dias antes da data marcada
- Quando faltar menos de 2 dias, exibe o telefone do salão para contato
- Sugestão de usar a mesma data ao agendar na mesma semana de um agendamento existente
- Histórico de agendamentos com data, serviços, observação e situação

### Administrador
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

## Estrutura do projeto

```
cabeleleila-leila/
├── frontend/        # Aplicação React
│   └── src/
│       ├── components/   # LayoutAdmin, LayoutCliente
│       ├── context/      # Autenticação (AuthContext)
│       ├── pages/        # Login, Cadastro, Agendamentos, Histórico
│       │   └── cliente/  # MeusAgendamentos, MeuHistorico
│       ├── routes/       # AppRoutes
│       ├── services/     # api.ts (integração com backend)
│       └── utils/        # situacoes.ts (mapeamento de status)
└── backend/
    ├── Api/         # Controllers e Program.cs
    ├── Data/        # DbContext
    └── Domain/      # Entidades e enums
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
