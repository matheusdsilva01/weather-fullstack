export type User = {
  _id: string
  email: string
  name: string
}

export type AuthUser = {
  sub: string
  email: string
  name: string
}

export type UpdateUserPayload = {
  name: string
}
