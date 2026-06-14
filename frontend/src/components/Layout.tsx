import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="conteudo">
        <Outlet />
      </main>
    </div>
  )
}