import type { UserInterface } from './user.interface'

export interface GetUsersServiceInterface {
  execute(): Promise<UserInterface[]>
}
