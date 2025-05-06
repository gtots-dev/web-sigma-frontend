import { auth } from '@/auth'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { GetUserFactory } from '@/modules/users/infrastructure/factories/get-user.factory'
import type { UserEntity } from '../../domain/entities/user.entity'

export async function getUser(): Promise<UserEntity> {
  const { token } = await auth()
  const jwtDecode = JwtTokenDecodeFactory.create()
  const { id } = jwtDecode.decode(token.access_token)
  const getUserFactory = GetUserFactory.create()
  return await getUserFactory.execute(token, id)
}
