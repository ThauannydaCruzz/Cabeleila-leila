import { Routes, Route, Navigate } from 'react-router-dom'
import LayoutAdmin from '../components/LayoutAdmin'
import LayoutCliente from '../components/LayoutCliente'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Agendamentos from '../pages/Agendamentos'
import Historico from '../pages/Historico'
import MeusAgendamentos from '../pages/cliente/MeusAgendamentos'
import MeuHistorico from '../pages/cliente/MeuHistorico'

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route path="/" element={<LayoutAdmin />}>
        <Route path="agendamentos" element={<Agendamentos />} />
        <Route path="historico" element={<Historico />} />
      </Route>

      <Route path="/" element={<LayoutCliente />}>
        <Route path="meus-agendamentos" element={<MeusAgendamentos />} />
        <Route path="meu-historico" element={<MeuHistorico />} />
      </Route>
    </Routes>
  )
}