import { createContext, useContext, useState } from 'react'

const ContextoAuth = createContext<any>(null)

export function ProvedorAuth({ children }: any) {
  const [usuario, setUsuario] = useState<any>(() => {
    const salvo = localStorage.getItem('usuario')
    return salvo ? JSON.parse(salvo) : null
  })

  function entrar(u: any) {
    setUsuario(u)
    localStorage.setItem('usuario', JSON.stringify(u))
  }

  function sair() {
    setUsuario(null)
    localStorage.removeItem('usuario')
  }

  return (
    <ContextoAuth.Provider value={{ usuario, entrar, sair }}>
      {children}
    </ContextoAuth.Provider>
  )
}

export function useAutenticacao() {
  return useContext(ContextoAuth)
}
