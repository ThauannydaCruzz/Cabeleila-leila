import { NavLink } from 'react-router-dom'

const itens = [
  { caminho: '/dashboard', rotulo: 'Dashboard', icone: '⊞' },
  { caminho: '/agendamentos', rotulo: 'Agendamentos', icone: '◫' },
  { caminho: '/clientes', rotulo: 'Clientes', icone: '◎' },
  { caminho: '/historico', rotulo: 'Histórico', icone: '◷' },
  { caminho: '/relatorio', rotulo: 'Relatório', icone: '▦' },
]

export default function Sidebar() {
  return (
    <aside className="menu-lateral">
      <div className="menu-topo">
        <div className="menu-logo">✂</div>
        <div>
          <div className="menu-nome">Leila</div>
          <div className="menu-sub">Salão de Beleza</div>
        </div>
      </div>
      <nav>
        {itens.map(({ caminho, rotulo, icone }) => (
          <NavLink
            key={caminho}
            to={caminho}
            className={({ isActive }) => `item-nav${isActive ? ' ativo' : ''}`}
          >
            <span>{icone}</span>
            {rotulo}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}