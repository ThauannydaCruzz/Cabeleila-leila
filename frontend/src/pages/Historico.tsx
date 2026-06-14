const historico = [
  { id: 1, cliente: 'Ana Souza', servico: 'Corte + Escova', data: '10/06/2026', valor: 'R$ 120,00' },
  { id: 2, cliente: 'Marina Lopes', servico: 'Coloração', data: '08/06/2026', valor: 'R$ 250,00' },
  { id: 3, cliente: 'Júlia Reis', servico: 'Manicure', data: '05/06/2026', valor: 'R$ 60,00' },
  { id: 4, cliente: 'Carla Mendes', servico: 'Hidratação', data: '01/06/2026', valor: 'R$ 90,00' },
  { id: 5, cliente: 'Fernanda Costa', servico: 'Corte', data: '28/05/2026', valor: 'R$ 80,00' },
  { id: 6, cliente: 'Patrícia Lima', servico: 'Escova', data: '25/05/2026', valor: 'R$ 70,00' },
]

export default function Historico() {
  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Histórico</h1>
      </div>
      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Serviço</th>
              <th>Data</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {historico.map(h => (
              <tr key={h.id}>
                <td>{h.cliente}</td>
                <td>{h.servico}</td>
                <td>{h.data}</td>
                <td className="negrito">{h.valor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}