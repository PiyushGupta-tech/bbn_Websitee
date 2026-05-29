export type UserProfile = {
  id: string
  email: string
  phone: string
  fullName: string
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  pinCode: string
  createdAt: string
  lastLoginAt: string | null
}

export type AdminProfile = {
  id: string
  email: string
  fullName: string
}

export type AuthEvent = {
  id: string
  type: 'login' | 'signup' | 'admin_login'
  userId: string
  email: string
  phone: string
  fullName: string
  city: string
  state: string
  pinCode: string
  addressLine1: string
  ip: string
  userAgent: string
  at: string
}

export type SignUpPayload = {
  email: string
  phone: string
  password: string
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pinCode: string
}
