import type { Session, User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import { JwtTokenDecodeFactory } from '@/modules/shared/infrastructure/factories/jwt-decode.factory'

type JWTCallbackParams = {
  token: JWT
  user?: User
  trigger?: 'signIn' | 'update' | 'signUp'
  session?: Session
}

export async function JWTCallbackAuth({
  token,
  user,
  trigger,
  session
}: JWTCallbackParams): Promise<JWT> {
  const jwtFactory = JwtTokenDecodeFactory.create()

  if (trigger === 'update' && session) {
    return {
      ...token,
      ...session
    }
  }

  if (user) {
    const accessToken = user.accessToken as string
    const decoded = jwtFactory.decode(accessToken)

    return {
      ...token,
      access_token: accessToken,
      token_type: 'Bearer',
      authType: decoded.type
    }
  }

  return token
}
