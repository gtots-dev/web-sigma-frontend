import type { UserEntity } from '../entities/user.entity'

export interface UserPasswordResetInterface {
  days_passwd_reg_deadline: UserEntity['days_passwd_reg_deadline']
}
