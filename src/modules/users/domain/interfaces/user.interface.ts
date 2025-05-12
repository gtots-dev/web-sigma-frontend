export interface UserInterface {
  id?: number
  login_name: string
  name: string
  email: string
  company: string
  position: string
  passwd_reg_deadline?: number
  enabled?: boolean
  password?: string
  description?: string
}
