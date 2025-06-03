export interface UserInterface {
  id?: number
  login_name: string
  name: string
  email: string
  company: string
  position: string
  days_passwd_reg_deadline?: number
  enabled?: boolean
  description?: string
}
