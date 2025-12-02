export type User = {
  _id: string
  email: string
  name: string
}

export type AuthUser = {
  _id: string
  email: string
  name: string
}

export type UpdateUserPayload = {
  name: string
}
