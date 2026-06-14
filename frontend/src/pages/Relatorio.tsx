const metricas = [
  { titulo: 'Faturamento do mês', valor: 'R$ 14.280', variacao: '+12% vs. mês anterior' },
  { titulo: 'Total de atendimentos', valor: '98', variacao: '+8% vs. mês anterior' },
  { titulo: 'Ticket médio', valor: 'R$ 145,71', variacao: '+4% vs. mês anterior' },
  { titulo: 'Novos clientes', valor: '23', variacao: '+15% vs. mês anterior' },
]

const servicos = [
  { servico: 'Corte', quantidade: 32, faturamento: 'R$ 2.560,00' },
  { servico: 'Escova', quantidade: 28, faturamento: 'R$ 1.960,00' },
  { servico: 'Coloração', quantidade: 18, faturamento: 'R$ 4.500,00' },
  { servico: 'Manicure', quantidade: 22, faturamento: 'R$ 1.320,00' },
  { servico: 'Hidratação', quantidade: 15, faturamento: 'R$ 1.350,00' },
  { servico: 'Outros', quantidade: 8, faturamento: 'R$ 640,00' },
]

export default function Relatorio() {
  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Relatório</h1>
      </div>
      <div className="grade-stats">
        {metricas.map((m, i) => (
          <div key={i} className="card-stat">
            <div className="stat-titulo">{m.titulo}</div>
            <div className="stat-valor">{m.valor}</div>
            <div className="positivo">{m.variacao}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="card-topo">
          <h2>Serviços realizados</h2>
        </div>
        <table className="tabela">
          <thead>
            <tr>
              <th>Serviço</th>
              <th>Quantidade</th>
              <th>Faturamento</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map((s, i) => (
              <tr key={i}>
                <td>{s.servico}</td>
                <td>{s.quantidade}</td>
                <td className="negrito">{s.faturamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}