import { Link } from 'react-router-dom'

const estatisticas = [
  { titulo: 'Agendamentos hoje', valor: '8' },
  { titulo: 'Clientes ativos', valor: '124' },
  { titulo: 'Serviços na semana', valor: '42' },
  { titulo: 'Faturamento semanal', valor: 'R$ 3.480' },
]

const proximos = [
  { nome: 'Ana Souza', servico: 'Corte + Escova', horario: '09:00' },
  { nome: 'Marina Lopes', servico: 'Coloração', horario: '10:30' },
  { nome: 'Júlia Reis', servico: 'Manicure', horario: '13:00' },
  { nome: 'Carla Mendes', servico: 'Hidratação', horario: '15:30' },
]

export default function Dashboard() {
  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Dashboard</h1>
      </div>
      <div className="grade-stats">
        {estatisticas.map((e, i) => (
          <div key={i} className="card-stat">
            <div className="stat-titulo">{e.titulo}</div>
            <div className="stat-valor">{e.valor}</div>
          </div>
        ))}
      </div>
      <div className="grade-dashboard">
        <div className="card">
          <div className="card-topo">
            <h2>Próximos agendamentos</h2>
            <Link to="/agendamentos" className="link">Ver todos</Link>
          </div>
          {proximos.map((a, i) => (
            <div key={i} className="item-agenda">
              <div>
                <div className="agenda-nome">{a.nome}</div>
                <div className="agenda-servico">{a.servico}</div>
              </div>
              <span className="horario">{a.horario}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <h2>Atalhos</h2>
          <div className="atalhos">
            <Link to="/agendamentos" className="botao">Novo agendamento</Link>
            <Link to="/clientes" className="botao-borda">Cadastrar cliente</Link>
            <Link to="/relatorio" className="botao-borda">Ver desempenho</Link>
          </div>
        </div>
      </div>
    </div>
  )
}