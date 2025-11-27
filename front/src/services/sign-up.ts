import { api } from '@/lib/api'
import type { AuthResponse, SignUpPayload } from '@/types/auth'

export async function signUp(payload: SignUpPayload) {
  const response = await api.post<AuthResponse>('/user', payload)
  return response.data
}
