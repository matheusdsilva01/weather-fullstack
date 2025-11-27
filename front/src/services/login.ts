import { api } from '@/lib/api'
import type { AuthResponse, LoginPayload } from '@/types/auth'

export async function login(payload: LoginPayload) {
  const response = await api.post<AuthResponse>('/auth/login', payload)
  return response.data
}
