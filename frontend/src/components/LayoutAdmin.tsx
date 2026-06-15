import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAutenticacao } from '../context/AuthContext'

export default function LayoutAdmin() {
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
            <div className="menu-nome">{usuario?.nome ?? 'Admin'}</div>
            <div className="menu-sub">Administrador</div>
          </div>
        </div>
        <nav>
          <NavLink to="/agendamentos" className={({ isActive }) => `item-menu${isActive ? ' ativo' : ''}`}>
            <span>◫</span> Agendamentos
          </NavLink>
          <NavLink to="/historico" className={({ isActive }) => `item-menu${isActive ? ' ativo' : ''}`}>
            <span>◷</span> Histórico
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
