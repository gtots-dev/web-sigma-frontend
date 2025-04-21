import { auth } from '@/auth'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { GetUserFactory } from '@/modules/users/infrastructure/factories/get-user.factory'
import type { UserInterface } from '../../domain/interfaces/user.interface'

export async function getUser(): Promise<UserInterface> {
  const { token } = await auth()
  const jwtDecode = JwtTokenDecodeFactory.create()
  const { id } = jwtDecode.decode(token.access_token)
  const getUserFactory = GetUserFactory.create()
  return await getUserFactory.execute(token, id)
}
