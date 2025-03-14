import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

export async function SessionCallbackAuth({
  session,
  token
}: {
  session: Session
  token: JWT
}) {
  return {
    ...session,
    user: {
      ...session.user,
      id: token.id as string,
      username: token.username as string
    },
    accessToken: token.accessToken as string
  }
}
