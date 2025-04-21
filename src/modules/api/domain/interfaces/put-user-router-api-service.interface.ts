import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'

export interface PutUserRouterApiServiceInterface {
  execute(user: UserInterface): Promise<UserInterface>
}
