import type { UserInterface } from '../interfaces/user.interface'

export class UserEntity implements UserInterface {
  constructor(
    public login_name: string,
    public name: string,
    public email: string,
    public company?: string | null,
    public position?: string | null,
    public id?: number,
    public days_passwd_reg_deadline?: number,
    public description?: string | null
  ) {}
}
