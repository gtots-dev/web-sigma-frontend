import type { UserInterface } from '../interfaces/user.interface'

export interface GetUsersGateway {
  execute(): Promise<UserInterface[]>
}
