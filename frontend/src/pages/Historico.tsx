import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { textoSituacao } from '../utils/situacoes'

export default function Historico() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [clientes, setClientes] = useState<any[]>([])

  useEffect(() => {
    api.get('agendamento').then(setAgendamentos)
    api.get('cliente').then(setClientes)
  }, [])

  function nomeCliente(id: string) {
    return clientes.find(c => c.id === id)?.nome ?? '—'
  }

  const ordenados = [...agendamentos].sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime())

  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Histórico</h1>
      </div>
      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr><th>Cliente</th><th>Data / Hora</th><th>Serviços</th><th>Observação</th><th>Situação</th></tr>
          </thead>
          <tbody>
            {ordenados.map((h: any) => (
              <tr key={h.id}>
                <td className="negrito">{nomeCliente(h.clienteId)}</td>
                <td>{new Date(h.dataHora).toLocaleString('pt-BR')}</td>
                <td>{h.servicos?.map((s: any) => s.nome).join(', ') || '—'}</td>
                <td>{h.observacao || '—'}</td>
                <td>{textoSituacao[h.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
