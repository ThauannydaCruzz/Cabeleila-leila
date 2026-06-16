import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useAutenticacao } from '../context/AuthContext'

const EMAIL_ADMIN = 'admin@salao.com'
const SENHA_ADMIN = 'admin123'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const navegar = useNavigate()
  const { entrar } = useAutenticacao()

  async function aoEnviar(e: React.FormEvent) {
    e.preventDefault()
    setErro('')

    if (email === EMAIL_ADMIN) {
      if (senha !== SENHA_ADMIN) {
        setErro('Senha incorreta.')
        return
      }
      entrar({ nome: 'Leila', email, perfil: 'admin' })
      navegar('/agendamentos')
      return
    }

    try {
      const cliente = await api.get(`cliente/email/${encodeURIComponent(email)}`)
      if (cliente.senha !== senha) {
        setErro('Senha incorreta.')
        return
      }
      entrar({ id: cliente.id, nome: cliente.nome, email, perfil: 'cliente' })
      navegar('/meus-agendamentos')
    } catch {
      setErro('E-mail não cadastrado. Verifique ou crie uma conta.')
    }
  }

  return (
    <div className="tela-acesso">
      <div className="caixa-acesso">
        <div className="logo-acesso">✂</div>
        <h1 className="titulo-acesso">Salão da Leila</h1>
        <p className="subtitulo-acesso">Entre para gerenciar seus agendamentos</p>
        <form onSubmit={aoEnviar}>
          <div className="grupo">
            <label className="rotulo">E-mail</label>
            <input type="email" className="campo" placeholder="voce@email.com" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="grupo">
            <label className="rotulo">Senha</label>
            <input type="password" className="campo" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)} />
          </div>
          {erro && <p style={{ color: '#c62828', fontSize: 14, marginBottom: 12 }}>{erro}</p>}
          <button type="submit" className="botao">Entrar</button>
        </form>
        <p className="rodape-acesso">
          Não tem conta?{' '}
          <a className="ancora" onClick={() => navegar('/cadastro')}>Cadastre-se</a>
        </p>
      </div>
    </div>
  )
}
