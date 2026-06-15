import { useEffect, useState } from 'react'
import { api } from '../services/api'
import { textoSituacao, corSituacao } from '../utils/situacoes'

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [clientes, setClientes] = useState<any[]>([])
  const [editando, setEditando] = useState<any>(null)

  useEffect(() => {
    api.get('agendamento').then(setAgendamentos)
    api.get('cliente').then(setClientes)
  }, [])

  function nomeCliente(id: string) {
    return clientes.find((c: any) => c.id === id)?.nome ?? '—'
  }

  async function aoConfirmar(a: any) {
    const atualizado = await api.put(`agendamento/${a.id}`, { ...a, status: 2 })
    setAgendamentos(agendamentos.map(x => x.id === a.id ? atualizado : x))
  }

  async function aoSalvarEdicao(e: React.FormEvent) {
    e.preventDefault()
    const atualizado = await api.put(`agendamento/${editando.id}`, editando)
    setAgendamentos(agendamentos.map(x => x.id === editando.id ? atualizado : x))
    setEditando(null)
  }

  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Agendamentos</h1>
      </div>

      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr><th>Cliente</th><th>Data / Hora</th><th>Serviços</th><th>Situação</th><th></th></tr>
          </thead>
          <tbody>
            {agendamentos.map((a: any) => (
              <tr key={a.id}>
                <td className="negrito">{nomeCliente(a.clienteId)}</td>
                <td>{new Date(a.dataHora).toLocaleString('pt-BR')}</td>
                <td>{a.servicos?.map((s: any) => s.nome).join(', ') || '—'}</td>
                <td><span className={corSituacao[a.status]}>{textoSituacao[a.status]}</span></td>
                <td style={{ display: 'flex', gap: 8 }}>
                  {a.status === 1 && (
                    <button className="botao botao-pequeno" onClick={() => aoConfirmar(a)}>Confirmar</button>
                  )}
                  <button className="botao-borda botao-pequeno" onClick={() => setEditando({ ...a, dataHora: a.dataHora.slice(0, 16) })}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editando && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <div className="cartao" style={{ width: 400 }}>
            <div className="cartao-topo">
              <h2>Editar Agendamento</h2>
              <button className="botao-borda botao-pequeno" onClick={() => setEditando(null)}>Fechar</button>
            </div>
            <form onSubmit={aoSalvarEdicao}>
              <div className="grupo">
                <label className="rotulo">Data e Hora</label>
                <input type="datetime-local" className="campo" value={editando.dataHora} onChange={e => setEditando({ ...editando, dataHora: e.target.value })} />
              </div>
              <div className="grupo">
                <label className="rotulo">Situação</label>
                <select className="campo" value={editando.status} onChange={e => setEditando({ ...editando, status: Number(e.target.value) })}>
                  <option value={1}>Pendente</option>
                  <option value={2}>Confirmado</option>
                  <option value={3}>Concluído</option>
                  <option value={4}>Cancelado</option>
                </select>
              </div>
              <div className="grupo">
                <label className="rotulo">Observação</label>
                <input className="campo" value={editando.observacao} onChange={e => setEditando({ ...editando, observacao: e.target.value })} />
              </div>
              <button type="submit" className="botao">Salvar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
