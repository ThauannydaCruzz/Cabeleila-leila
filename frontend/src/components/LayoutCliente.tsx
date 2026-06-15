import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAutenticacao } from '../context/AuthContext'

export default function LayoutCliente() {
  const { usuario, sair } = useAutenticacao()
  const navegar = useNavigate()

  function aoSair() {
    sair()
    navegar('/login')
  }

  return (
    <div className="layout">
      <aside className="menu-lateral">
        <div className="menu-topo">
          <div className="menu-logo">✂</div>
          <div>
            <div className="menu-nome">{usuario?.nome}</div>
            <div className="menu-sub">Cliente</div>
          </div>
        </div>
        <nav>
          <NavLink to="/meus-agendamentos" className={({ isActive }) => `item-menu${isActive ? ' ativo' : ''}`}>
            <span>◫</span> Meus Agendamentos
          </NavLink>
          <NavLink to="/meu-historico" className={({ isActive }) => `item-menu${isActive ? ' ativo' : ''}`}>
            <span>◷</span> Meu Histórico
          </NavLink>
        </nav>
        <button className="botao-borda botao-pequeno" onClick={aoSair} style={{ marginTop: 'auto' }}>
          Sair
        </button>
      </aside>
      <main className="conteudo">
        <Outlet />
      </main>
    </div>
  )
}
