import { auth } from '@/auth'
import { GetUsersFactory } from '../../infrastructure/factories/get-users.factory'
import type { UserInterface } from '../../domain/interfaces/user.interface'

export async function getUsers(): Promise<UserInterface[]> {
  const { token } = await auth()
  const getUsersFactory = GetUsersFactory.create()
  return await getUsersFactory.execute(token)
}
