import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState<any[]>([])

  useEffect(() => {
    api.get('agendamento').then(setAgendamentos)
  }, [])

  const total = agendamentos.length
  const pendentes = agendamentos.filter(a => a.status === 1).length
  const confirmados = agendamentos.filter(a => a.status === 2).length
  const concluidos = agendamentos.filter(a => a.status === 3).length
  const cancelados = agendamentos.filter(a => a.status === 4).length

  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Dashboard</h1>
      </div>
      <div className="grade-resumo">
        <div className="cartao-resumo">
          <p className="resumo-titulo">Total</p>
          <p className="resumo-valor">{total}</p>
        </div>
        <div className="cartao-resumo">
          <p className="resumo-titulo">Pendentes</p>
          <p className="resumo-valor">{pendentes}</p>
        </div>
        <div className="cartao-resumo">
          <p className="resumo-titulo">Confirmados</p>
          <p className="resumo-valor">{confirmados}</p>
        </div>
        <div className="cartao-resumo">
          <p className="resumo-titulo">Concluídos</p>
          <p className="resumo-valor">{concluidos}</p>
        </div>
        <div className="cartao-resumo">
          <p className="resumo-titulo">Cancelados</p>
          <p className="resumo-valor">{cancelados}</p>
        </div>
      </div>
    </div>
  )
}
