import type { UserInterface } from '../interfaces/user.interface'

export class UserEntity implements UserInterface {
  constructor(
    public login_name: string,
    public name: string,
    public email: string,
    public company: string,
    public position: string,
    public id?: number,
    public enabled?: boolean,
    public days_passwd_reg_deadline?: number,
    public password?: string,
    public description?: string
  ) {}
}
