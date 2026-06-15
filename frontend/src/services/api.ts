const BASE = 'http://localhost:5233/api'

async function req(metodo: string, rota: string, corpo?: unknown) {
  const res = await fetch(`${BASE}/${rota}`, {
    method: metodo,
    headers: corpo ? { 'Content-Type': 'application/json' } : {},
    body: corpo ? JSON.stringify(corpo) : undefined,
  })
  if (!res.ok) throw new Error()
  return res.status === 204 ? null : res.json()
}

export const api = {
  get: (rota: string) => req('GET', rota),
  post: (rota: string, corpo: unknown) => req('POST', rota, corpo),
  put: (rota: string, corpo: unknown) => req('PUT', rota, corpo),
  del: (rota: string) => req('DELETE', rota),
}
