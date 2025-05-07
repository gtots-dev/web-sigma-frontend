import type { User } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

export async function JWTCallbackAuth({
  token,
  user
}: {
  token: JWT
  user?: User
}): Promise<JWT> {
  if (user) {
    token.access_token = user.accessToken as string
    token.token_type = 'Bearer' as string
  }
  return token
}
