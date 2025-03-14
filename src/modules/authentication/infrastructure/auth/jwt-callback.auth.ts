import type { User } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export async function JWTCallbackAuth({
  token,
  user
}: {
  token: JWT
  user?: User
}) {
  if (user) {
    token.id = user.id
    token.accessToken = user.accessToken
    token.username = user.username
  }
  return token
}
