import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAutenticacao } from '../context/AuthContext'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navegar = useNavigate()
  const { entrar } = useAutenticacao()

  async function aoEnviar(e: React.FormEvent) {
    e.preventDefault()
    setErro('')
    try {
      const cliente = await api.post('cliente', { nome, email, telefone, senha })
      entrar({ id: cliente.id, nome: cliente.nome, email, perfil: 'cliente' })
      navegar('/meus-agendamentos')
    } catch {
      setErro('Erro ao cadastrar. Tente novamente.')
    }
  }

  return (
    <div className="tela-acesso">
      <div className="caixa-acesso">
        <div className="logo-acesso">✂</div>
        <h1 className="titulo-acesso">Criar conta</h1>
        <p className="subtitulo-acesso">Cadastre-se para começar a usar o sistema</p>
        <form onSubmit={aoEnviar}>
          <div className="grupo">
            <label className="rotulo">Nome</label>
            <input type="text" className="campo" placeholder="Seu nome completo" value={nome} onChange={e => setNome(e.target.value)} required />
          </div>
          <div className="grupo">
            <label className="rotulo">E-mail</label>
            <input type="email" className="campo" placeholder="voce@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="grupo">
            <label className="rotulo">Telefone</label>
            <input type="tel" className="campo" placeholder="(11) 99999-9999" value={telefone} onChange={e => setTelefone(e.target.value)} required />
          </div>
          <div className="grupo">
            <label className="rotulo">Senha</label>
            <input type="password" className="campo" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)} />
          </div>
          {erro && <p style={{ color: '#c62828', fontSize: 14, marginBottom: 12 }}>{erro}</p>}
          <button type="submit" className="botao">Cadastrar</button>
        </form>
        <p className="rodape-acesso">
          Já tem conta?{' '}
          <a className="ancora" onClick={() => navegar('/login')}>Entrar</a>
        </p>
      </div>
    </div>
  )
}
