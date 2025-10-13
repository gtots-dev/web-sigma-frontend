import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'
import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export async function SessionCallbackAuth({
  session,
  token
}: {
  session: Session
  token: JWT
}) {
  const jwtFactory = JwtTokenDecodeFactory.create()
  const { id, login_name } = jwtFactory.decode(token.access_token)
  return {
    ...session,
    user: {
      id: String(id) as string,
      username: login_name as string,
      isAdmin: id === 1
    },
    token: {
      access_token: token.access_token as string,
      token_type: 'Bearer' as string
    }
  }
}
