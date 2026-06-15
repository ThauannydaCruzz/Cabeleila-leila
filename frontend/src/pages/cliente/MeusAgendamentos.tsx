import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { useAutenticacao } from '../../context/AuthContext'
import { textoSituacao, corSituacao } from '../../utils/situacoes'

const TELEFONE_SALAO = '(11) 98765-4321'
const HORARIOS = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30']
const DOIS_DIAS_MS = 2 * 24 * 60 * 60 * 1000

function buscarAgendamentoNaSemana(agendamentos: any[], dataSelecionada: string) {
  const data = new Date(dataSelecionada)
  const inicioDaSemana = new Date(data)
  inicioDaSemana.setDate(data.getDate() - data.getDay())
  inicioDaSemana.setHours(0, 0, 0, 0)
  const fimDaSemana = new Date(inicioDaSemana)
  fimDaSemana.setDate(inicioDaSemana.getDate() + 6)
  fimDaSemana.setHours(23, 59, 59, 999)

  return agendamentos.find(a => {
    const dataAgendamento = new Date(a.dataHora)
    return dataAgendamento >= inicioDaSemana && dataAgendamento <= fimDaSemana
  })
}

export default function MeusAgendamentos() {
  const { usuario } = useAutenticacao()

  const [agendamentos, setAgendamentos] = useState<any[]>([])
  const [servicos, setServicos] = useState<any[]>([])

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [data, setData] = useState('')
  const [hora, setHora] = useState('')
  const [observacao, setObservacao] = useState('')
  const [selecionados, setSelecionados] = useState<any[]>([])

  const [sugestao, setSugestao] = useState<any>(null)

  const [editando, setEditando] = useState<any>(null)
  const [dataEdicao, setDataEdicao] = useState('')
  const [horaEdicao, setHoraEdicao] = useState('')
  const [observacaoEdicao, setObservacaoEdicao] = useState('')

  useEffect(() => {
    api.get(`agendamento/cliente/${usuario.id}`).then(setAgendamentos)
    api.get('servico').then(setServicos)
  }, [])

  function aoSelecionarData(dataSelecionada: string) {
    setData(dataSelecionada)
    const agendamentoEncontrado = buscarAgendamentoNaSemana(agendamentos, dataSelecionada)
    setSugestao(agendamentoEncontrado || null)
  }

  function usarDataSugerida() {
    const dt = new Date(sugestao.dataHora)
    setData(dt.toISOString().split('T')[0])
    setHora(dt.toTimeString().slice(0, 5))
    setSugestao(null)
  }

  function podeAlterar(dataHora: string) {
    return new Date(dataHora).getTime() - Date.now() > DOIS_DIAS_MS
  }

  function toggleServico(servico: any) {
    const jaSelecionado = selecionados.find(s => s.id === servico.id)
    if (jaSelecionado) {
      setSelecionados(selecionados.filter(s => s.id !== servico.id))
    } else {
      setSelecionados([...selecionados, servico])
    }
  }

  function abrirEdicao(agendamento: any) {
    const dt = new Date(agendamento.dataHora)
    setEditando(agendamento)
    setDataEdicao(dt.toISOString().split('T')[0])
    setHoraEdicao(dt.toTimeString().slice(0, 5))
    setObservacaoEdicao(agendamento.observacao || '')
  }

  async function criarAgendamento(e: React.FormEvent) {
    e.preventDefault()
    const novo = await api.post('agendamento', {
      clienteId: usuario.id,
      dataHora: `${data}T${hora}`,
      status: 1,
      observacao,
      servicos: selecionados.map(s => ({ nome: s.nome, preco: s.preco, duracaoMinutos: s.duracaoMinutos })),
    })
    setAgendamentos([...agendamentos, novo])
    setData(''); setHora(''); setObservacao(''); setSelecionados([])
    setMostrarFormulario(false)
  }

  async function salvarEdicao(e: React.FormEvent) {
    e.preventDefault()
    const atualizado = await api.put(`agendamento/${editando.id}`, {
      ...editando,
      dataHora: `${dataEdicao}T${horaEdicao}`,
      observacao: observacaoEdicao,
    })
    setAgendamentos(agendamentos.map(a => a.id === editando.id ? { ...a, ...atualizado } : a))
    setEditando(null)
  }

  async function cancelarAgendamento(id: string) {
    await api.del(`agendamento/${id}`)
    setAgendamentos(agendamentos.filter(a => a.id !== id))
  }

  return (
    <div>
      <div className="pagina-topo">
        <h1 className="pagina-titulo">Meus Agendamentos</h1>
        <button className="botao botao-pequeno" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
          {mostrarFormulario ? 'Fechar' : '+ Novo'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="cartao" style={{ marginBottom: 20 }}>
          <form onSubmit={criarAgendamento}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="grupo">
                <label className="rotulo">Data</label>
                <input
                  type="date"
                  className="campo"
                  value={data}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => aoSelecionarData(e.target.value)}
                  required
                />
              </div>
              <div className="grupo">
                <label className="rotulo">Horário</label>
                <select className="campo" value={hora} onChange={e => setHora(e.target.value)} required>
                  <option value="">Selecione</option>
                  {HORARIOS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>

            {sugestao && (
              <div style={{ background: '#fce8e5', border: '1px solid var(--primaria)', borderRadius: 8, padding: 12, marginBottom: 16 }}>
                <p style={{ fontSize: 14, color: '#a86470', marginBottom: 8 }}>
                  Você já tem um agendamento nessa semana em {new Date(sugestao.dataHora).toLocaleString('pt-BR')}. Deseja usar essa mesma data?
                </p>
                <button type="button" className="botao-borda botao-pequeno" onClick={usarDataSugerida}>
                  Usar essa data
                </button>
              </div>
            )}

            <div className="grupo">
              <label className="rotulo">Serviços</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                {servicos.map(s => (
                  <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={!!selecionados.find(x => x.id === s.id)}
                      onChange={() => toggleServico(s)}
                    />
                    {s.nome} — R$ {Number(s.preco).toFixed(2)} ({s.duracaoMinutos} min)
                  </label>
                ))}
              </div>
            </div>

            <div className="grupo">
              <label className="rotulo">Observação</label>
              <input className="campo" value={observacao} onChange={e => setObservacao(e.target.value)} />
            </div>

            <button type="submit" className="botao botao-pequeno" disabled={!data || !hora}>
              Salvar
            </button>
          </form>
        </div>
      )}

      {editando && (
        <div className="cartao" style={{ marginBottom: 20 }}>
          <p style={{ fontWeight: 600, marginBottom: 12 }}>Alterar horário</p>
          <form onSubmit={salvarEdicao}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="grupo">
                <label className="rotulo">Data</label>
                <input
                  type="date"
                  className="campo"
                  value={dataEdicao}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setDataEdicao(e.target.value)}
                  required
                />
              </div>
              <div className="grupo">
                <label className="rotulo">Horário</label>
                <select className="campo" value={horaEdicao} onChange={e => setHoraEdicao(e.target.value)} required>
                  <option value="">Selecione</option>
                  {HORARIOS.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
              </div>
            </div>
            <div className="grupo">
              <label className="rotulo">Observação</label>
              <input className="campo" value={observacaoEdicao} onChange={e => setObservacaoEdicao(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button type="submit" className="botao botao-pequeno" disabled={!dataEdicao || !horaEdicao}>
                Confirmar
              </button>
              <button type="button" className="botao-borda botao-pequeno" onClick={() => setEditando(null)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="tabela-container">
        <table className="tabela">
          <thead>
            <tr><th>Data / Hora</th><th>Serviços</th><th>Situação</th><th></th></tr>
          </thead>
          <tbody>
            {agendamentos.map(a => (
              <tr key={a.id}>
                <td>{new Date(a.dataHora).toLocaleString('pt-BR')}</td>
                <td>{a.servicos?.map((s: any) => s.nome).join(', ') || '—'}</td>
                <td><span className={corSituacao[a.status]}>{textoSituacao[a.status]}</span></td>
                <td>
                  {podeAlterar(a.dataHora) ? (
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="botao-borda botao-pequeno" onClick={() => abrirEdicao(a)}>Editar</button>
                      <button className="botao-borda botao-pequeno" onClick={() => cancelarAgendamento(a.id)}>Cancelar</button>
                    </div>
                  ) : (
                    <span style={{ fontSize: 12, color: 'var(--texto-suave)' }}>Ligue: {TELEFONE_SALAO}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
