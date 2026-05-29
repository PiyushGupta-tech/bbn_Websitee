import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  apiAdminLogin,
  apiLogin,
  apiLogout,
  apiMe,
  apiRegister,
  apiUpdateProfile,
  getStoredToken,
} from '../api/auth'
import type { AdminProfile, SignUpPayload, UserProfile } from '../types/auth'

type AuthState =
  | { status: 'loading' }
  | { status: 'guest' }
  | { status: 'customer'; user: UserProfile }
  | { status: 'admin'; admin: AdminProfile }

interface AuthContextValue {
  state: AuthState
  user: UserProfile | null
  admin: AdminProfile | null
  loading: boolean
  login: (loginId: string, password: string) => Promise<void>
  signUp: (payload: SignUpPayload) => Promise<void>
  adminLogin: (email: string, password: string) => Promise<void>
  updateProfile: (patch: Partial<UserProfile>) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() =>
    getStoredToken() ? { status: 'loading' } : { status: 'guest' },
  )

  const refresh = useCallback(async () => {
    const token = getStoredToken()
    if (!token) {
      setState({ status: 'guest' })
      return
    }
    try {
      const data = await apiMe()
      if (!data || data.ok === false) {
        setState({ status: 'guest' })
        return
      }
      if (data.role === 'admin' && data.admin) {
        setState({ status: 'admin', admin: data.admin })
        return
      }
      if (data.role === 'customer' && data.user) {
        setState({ status: 'customer', user: data.user })
        return
      }
      setState({ status: 'guest' })
    } catch {
      setState({ status: 'guest' })
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const login = useCallback(async (loginId: string, password: string) => {
    const { user } = await apiLogin(loginId, password)
    setState({ status: 'customer', user })
  }, [])

  const signUp = useCallback(async (payload: SignUpPayload) => {
    const { user } = await apiRegister(payload)
    setState({ status: 'customer', user })
  }, [])

  const adminLogin = useCallback(async (email: string, password: string) => {
    const { admin } = await apiAdminLogin(email, password)
    setState({ status: 'admin', admin })
  }, [])

  const updateProfile = useCallback(async (patch: Partial<UserProfile>) => {
    const user = await apiUpdateProfile(patch)
    setState({ status: 'customer', user })
  }, [])

  const logout = useCallback(async () => {
    await apiLogout()
    setState({ status: 'guest' })
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    const user = state.status === 'customer' ? state.user : null
    const admin = state.status === 'admin' ? state.admin : null
    return {
      state,
      user,
      admin,
      loading: state.status === 'loading',
      login,
      signUp,
      adminLogin,
      updateProfile,
      logout,
      refresh,
    }
  }, [state, login, signUp, adminLogin, updateProfile, logout, refresh])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
