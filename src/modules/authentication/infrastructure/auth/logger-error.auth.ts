import { CredentialsSignin } from 'next-auth'

type ErrorWithCause = Error & { cause?: unknown }

function isError(value: unknown): value is Error {
  return value instanceof Error
}

export function LoggerErrorAuth(error: Error): void {
  if (error instanceof CredentialsSignin) {
    const cause = (error as ErrorWithCause).cause

    console.error('🔐 [AUTH] Login failed')

    if (isError(cause) && cause.message) {
      console.error('↳ Backend:', cause.message)
    }

    return
  }

  console.error('🔐 [AUTH] NextAuth error:', error.message)
}
