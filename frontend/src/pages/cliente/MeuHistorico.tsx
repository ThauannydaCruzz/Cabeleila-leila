import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useAutenticacao } from '../../context/AuthContext'
import { textoSituacao } from '../../utils/situacoes'

export default function MeuHistorico() {
  const { usuario } = useAutenticacao()
  const [historico, setHistorico] = useState<any[]>([])

  useEffect(() => {
    api.get(`agendamento/cliente/${usuario.id}`).then(setHistorico)
  }, [])

  const ordenados = [...historico].sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime())

  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Meu Histórico</h1>
      </div>
      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr><th>Data / Hora</th><th>Serviços</th><th>Observação</th><th>Situação</th></tr>
          </thead>
          <tbody>
            {ordenados.map((h: any) => (
              <tr key={h.id}>
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
