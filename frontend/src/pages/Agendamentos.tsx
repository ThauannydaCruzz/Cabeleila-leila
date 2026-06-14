const agendamentos = [
  { id: 1, cliente: 'Ana Souza', servico: 'Corte + Escova', data: '14/06/2026', horario: '09:00', situacao: 'Confirmado' },
  { id: 2, cliente: 'Marina Lopes', servico: 'Coloração', data: '14/06/2026', horario: '10:30', situacao: 'Confirmado' },
  { id: 3, cliente: 'Júlia Reis', servico: 'Manicure', data: '14/06/2026', horario: '13:00', situacao: 'Pendente' },
  { id: 4, cliente: 'Carla Mendes', servico: 'Hidratação', data: '14/06/2026', horario: '15:30', situacao: 'Confirmado' },
  { id: 5, cliente: 'Fernanda Costa', servico: 'Corte', data: '15/06/2026', horario: '09:00', situacao: 'Pendente' },
  { id: 6, cliente: 'Patrícia Lima', servico: 'Escova', data: '15/06/2026', horario: '11:00', situacao: 'Cancelado' },
]

const classeSituacao: Record<string, string> = {
  Confirmado: 'status confirmado',
  Pendente: 'status pendente',
  Cancelado: 'status cancelado',
}

export default function Agendamentos() {
  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Agendamentos</h1>
        <button className="botao botao-pequeno">+ Novo agendamento</button>
      </div>
      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Serviço</th>
              <th>Data</th>
              <th>Horário</th>
              <th>Situação</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map(a => (
              <tr key={a.id}>
                <td>{a.cliente}</td>
                <td>{a.servico}</td>
                <td>{a.data}</td>
                <td><span className="horario">{a.horario}</span></td>
                <td><span className={classeSituacao[a.situacao]}>{a.situacao}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}