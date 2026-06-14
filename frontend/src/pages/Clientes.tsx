const clientes = [
  { id: 1, nome: 'Ana Souza', telefone: '(11) 99999-0001', email: 'ana@email.com', ultimaVisita: '10/06/2026' },
  { id: 2, nome: 'Marina Lopes', telefone: '(11) 99999-0002', email: 'marina@email.com', ultimaVisita: '08/06/2026' },
  { id: 3, nome: 'Júlia Reis', telefone: '(11) 99999-0003', email: 'julia@email.com', ultimaVisita: '05/06/2026' },
  { id: 4, nome: 'Carla Mendes', telefone: '(11) 99999-0004', email: 'carla@email.com', ultimaVisita: '01/06/2026' },
  { id: 5, nome: 'Fernanda Costa', telefone: '(11) 99999-0005', email: 'fernanda@email.com', ultimaVisita: '28/05/2026' },
]

export default function Clientes() {
  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Clientes</h1>
        <button className="botao botao-pequeno">+ Cadastrar cliente</button>
      </div>
      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>E-mail</th>
              <th>Última visita</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(c => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.telefone}</td>
                <td>{c.email}</td>
                <td>{c.ultimaVisita}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}