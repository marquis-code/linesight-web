export function useApi() {
  const config = useRuntimeConfig()
  const token = useState<string | null>('ls_token', () => null)
  const user = useState<any>('ls_user', () => null)

  function init() {
    if (!import.meta.client || token.value) return
    const stored = localStorage.getItem('ls_token')
    const storedUser = localStorage.getItem('ls_user')
    if (stored) token.value = stored
    if (storedUser) { try { user.value = JSON.parse(storedUser) } catch {} }
  }
  function persist(nextToken: string, nextUser: any) {
    token.value = nextToken; user.value = nextUser
    if (import.meta.client) { localStorage.setItem('ls_token', nextToken); localStorage.setItem('ls_user', JSON.stringify(nextUser)) }
  }
  function clear() {
    token.value = null; user.value = null
    if (import.meta.client) { localStorage.removeItem('ls_token'); localStorage.removeItem('ls_user') }
  }
  async function request<T = any>(path: string, opts: any = {}): Promise<T> {
    init()
    const headers: Record<string, string> = { ...(opts.headers || {}) }
    if (opts.body && !(opts.body instanceof FormData)) headers['Content-Type'] = 'application/json'
    if (token.value) headers.Authorization = `Bearer ${token.value}`
    return await $fetch<T>(`${config.public.apiBase}${path}`, { ...opts, headers })
  }
  async function login(email: string, password: string) {
    const data = await request<any>('/auth/login', { method: 'POST', body: { email, password } })
    persist(data.token, data.user)
    return data
  }
  async function download(path: string, filename: string) {
    init()
    const res = await fetch(`${config.public.apiBase}${path}`, { headers: token.value ? { Authorization: `Bearer ${token.value}` } : {} })
    if (!res.ok) throw new Error('Download failed')
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url)
  }
  async function me() {
    init(); if (!token.value) return null
    try { const data = await request<any>('/auth/me'); user.value = data.user; if (import.meta.client) localStorage.setItem('ls_user', JSON.stringify(data.user)); return data.user } catch { clear(); return null }
  }
  return { request, download, login, me, init, clear, token, user }
}

export function money(value: number | string | undefined, currency = 'USD') {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(Number(value || 0))
}
export function shortDate(value: string | Date | undefined) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}
