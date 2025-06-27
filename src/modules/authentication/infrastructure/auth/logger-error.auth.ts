import { CredentialsSignin } from 'next-auth'

export function LoggerErrorAuth(error: Error): void {
  if (error instanceof CredentialsSignin) {
    console.log('[Auth] Credenciais inválidas.')
    console.log(error)
  }
}
