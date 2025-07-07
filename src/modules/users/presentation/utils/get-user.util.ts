import { auth } from '@/auth'
import type { UserInterface } from '../../domain/interfaces/user.interface'
import { GetUserMeFactory } from '../../infrastructure/factories/get-user-me.factory'

export async function getUserMe(): Promise<UserInterface> {
  const { token } = await auth()
  const getUserMeFactory = GetUserMeFactory.create()
  return await getUserMeFactory.execute(token)
}
