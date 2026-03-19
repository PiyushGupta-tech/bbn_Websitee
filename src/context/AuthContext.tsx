import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_USERS = 'bbn-auth-users-v1'
const STORAGE_SESSION = 'bbn-auth-session-v1'

type UserRecord = { email: string; password: string }

export type AuthUser = { email: string }

interface AuthContextValue {
  user: AuthUser | null
  login: (email: string, password: string) => { ok: true } | { ok: false; message: string }
  signUp: (email: string, password: string) => { ok: true } | { ok: false; message: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadUsers(): UserRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_USERS)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (row): row is UserRecord =>
        typeof row === 'object' &&
        row !== null &&
        typeof (row as UserRecord).email === 'string' &&
        typeof (row as UserRecord).password === 'string'
    )
  } catch {
    return []
  }
}

function saveUsers(users: UserRecord[]) {
  localStorage.setItem(STORAGE_USERS, JSON.stringify(users))
}

function loadSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_SESSION)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      typeof (parsed as AuthUser).email === 'string'
    ) {
      return { email: (parsed as AuthUser).email }
    }
    return null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    typeof window !== 'undefined' ? loadSession() : null
  )

  const persistSession = useCallback((next: AuthUser | null) => {
    if (next) localStorage.setItem(STORAGE_SESSION, JSON.stringify(next))
    else localStorage.removeItem(STORAGE_SESSION)
    setUser(next)
  }, [])

  const login = useCallback(
    (email: string, password: string): { ok: true } | { ok: false; message: string } => {
      const e = email.trim().toLowerCase()
      if (!e) return { ok: false, message: 'Please enter your email.' }
      if (!password) return { ok: false, message: 'Please enter your password.' }
      const users = loadUsers()
      const found = users.find((u) => u.email === e)
      if (!found || found.password !== password) {
        return { ok: false, message: 'Invalid email or password.' }
      }
      persistSession({ email: e })
      return { ok: true }
    },
    [persistSession]
  )

  const signUp = useCallback(
    (email: string, password: string): { ok: true } | { ok: false; message: string } => {
      const e = email.trim().toLowerCase()
      if (!e) return { ok: false, message: 'Please enter your email.' }
      if (password.length < 6) {
        return { ok: false, message: 'Password must be at least 6 characters.' }
      }
      const users = loadUsers()
      if (users.some((u) => u.email === e)) {
        return { ok: false, message: 'An account with this email already exists.' }
      }
      saveUsers([...users, { email: e, password }])
      persistSession({ email: e })
      return { ok: true }
    },
    [persistSession]
  )

  const logout = useCallback(() => {
    persistSession(null)
  }, [persistSession])

  const value = useMemo(
    () => ({ user, login, signUp, logout }),
    [user, login, signUp, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
