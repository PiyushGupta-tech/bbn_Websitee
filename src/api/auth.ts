import type { AdminProfile, AuthEvent, SignUpPayload, UserProfile } from '../types/auth'

const TOKEN_KEY = 'bbn-auth-token-v2'

function authHeaders(): HeadersInit {
  const token = localStorage.getItem(TOKEN_KEY)
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setStoredToken(token: string | null) {
  if (token) localStorage.setItem(TOKEN_KEY, token)
  else localStorage.removeItem(TOKEN_KEY)
}

async function parseAuth<T>(res: Response): Promise<T & { ok: boolean; message?: string }> {
  const text = await res.text()
  try {
    return JSON.parse(text) as T & { ok: boolean; message?: string }
  } catch {
    const isHtml = text.trimStart().startsWith('<')
    const message = isHtml
      ? 'Auth API is not reachable (got a web page instead of JSON). For local dev run `npm run dev:server` in another terminal. On the live site, deploy the `api/auth` folder from the build.'
      : 'Auth server returned an invalid response.'
    return { ok: false, message }
  }
}

export async function apiRegister(payload: SignUpPayload) {
  const res = await fetch('/api/auth/register.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await parseAuth<{ token?: string; user?: UserProfile; role?: string }>(res)
  if (!data.ok || !data.token || !data.user) {
    throw new Error(data.message || 'Registration failed')
  }
  setStoredToken(data.token)
  return { token: data.token, user: data.user }
}

export async function apiLogin(loginId: string, password: string) {
  const res = await fetch('/api/auth/login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ loginId, password }),
  })
  const data = await parseAuth<{ token?: string; user?: UserProfile }>(res)
  if (!data.ok || !data.token || !data.user) {
    throw new Error(data.message || 'Login failed')
  }
  setStoredToken(data.token)
  return { token: data.token, user: data.user }
}

export async function apiAdminLogin(email: string, password: string) {
  const res = await fetch('/api/auth/admin-login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await parseAuth<{ token?: string; admin?: AdminProfile }>(res)
  if (!data.ok || !data.token || !data.admin) {
    throw new Error(data.message || 'Admin login failed')
  }
  setStoredToken(data.token)
  return { token: data.token, admin: data.admin }
}

export async function apiMe() {
  const res = await fetch('/api/auth/me.php', { headers: authHeaders() })
  const data = await parseAuth<{
    role?: 'customer' | 'admin'
    user?: UserProfile
    admin?: AdminProfile
  }>(res)
  if (!data.ok) {
    if (res.status === 401) return null
    throw new Error(data.message || 'Could not verify session')
  }
  return data
}

export async function apiUpdateProfile(patch: Partial<UserProfile>) {
  const res = await fetch('/api/auth/me.php', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(patch),
  })
  const data = await parseAuth<{ user?: UserProfile }>(res)
  if (!data.ok || !data.user) {
    throw new Error(data.message || 'Could not update profile')
  }
  return data.user
}

export async function apiLogout() {
  try {
    await fetch('/api/auth/logout.php', { method: 'POST', headers: authHeaders() })
  } finally {
    setStoredToken(null)
  }
}

export async function apiAdminDashboard() {
  const res = await fetch('/api/auth/admin-dashboard.php', { headers: authHeaders() })
  const data = await parseAuth<{
    stats?: { totalUsers: number; totalEvents: number; loginsToday: number }
    users?: UserProfile[]
    events?: AuthEvent[]
  }>(res)
  if (!data.ok) {
    throw new Error(data.message || 'Could not load admin data')
  }
  return {
    stats: data.stats ?? { totalUsers: 0, totalEvents: 0, loginsToday: 0 },
    users: data.users ?? [],
    events: data.events ?? [],
  }
}
