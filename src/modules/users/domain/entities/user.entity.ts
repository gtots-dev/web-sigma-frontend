import type { UserInterface } from '../interfaces/user.interface'

export class UserEntity implements UserInterface {
  constructor(
    public id: number,
    public login_name: string,
    public name: string,
    public email: string,
    public company: string,
    public position: string,
    public enabled: boolean
  ) {}
}
