import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Login from '../pages/Login'
import Cadastro from '../pages/Cadastro'
import Dashboard from '../pages/Dashboard'
import Agendamentos from '../pages/Agendamentos'
import Clientes from '../pages/Clientes'
import Historico from '../pages/Historico'
import Relatorio from '../pages/Relatorio'

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="agendamentos" element={<Agendamentos />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="historico" element={<Historico />} />
        <Route path="relatorio" element={<Relatorio />} />
      </Route>
    </Routes>
  )
}