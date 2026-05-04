import type { UserInterface } from '../interfaces/user.interface'

export interface GetUserGateway {
  execute(operationSelectedId: number
  ): Promise<UserInterface>
}
