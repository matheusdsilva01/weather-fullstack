import Cookies from 'js-cookie'
import { createContext, type ReactNode, useContext, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    Cookies.get('token') || null
  )
  const isAuthenticated = !!token

  const login = (newToken: string) => {
    Cookies.set('token', newToken, { expires: 1 / 24 }) // Expires in 1 hour
    setToken(newToken)
  }

  const logout = () => {
    Cookies.remove('token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
