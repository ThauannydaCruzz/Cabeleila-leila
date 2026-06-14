import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="tela-auth">
      <div className="card-auth">
        <div className="logo-auth">✂</div>
        <h1 className="titulo-auth">Criar conta</h1>
        <p className="subtitulo-auth">Cadastre-se para começar a usar o sistema</p>
        <form onSubmit={handleSubmit}>
          <div className="grupo">
            <label className="rotulo">Nome</label>
            <input type="text" className="campo" placeholder="Seu nome completo" value={nome} onChange={e => setNome(e.target.value)} />
          </div>
          <div className="grupo">
            <label className="rotulo">E-mail</label>
            <input type="email" className="campo" placeholder="voce@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="grupo">
            <label className="rotulo">Senha</label>
            <input type="password" className="campo" placeholder="••••••••" value={senha} onChange={e => setSenha(e.target.value)} />
          </div>
          <div className="grupo">
            <label className="rotulo">Confirmar senha</label>
            <input type="password" className="campo" placeholder="••••••••" value={confirmar} onChange={e => setConfirmar(e.target.value)} />
          </div>
          <button type="submit" className="botao">Cadastrar</button>
        </form>
        <p className="rodape-auth">
          Já tem conta?{' '}
          <a className="link" onClick={() => navigate('/login')}>Entrar</a>
        </p>
      </div>
    </div>
  )
}