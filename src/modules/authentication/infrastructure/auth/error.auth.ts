import { CredentialsSignin } from 'next-auth'

export class InvalidAuthError extends CredentialsSignin {
  constructor(message: string, cause?: Error) {
    super(message, { cause })
    this.name = 'InvalidAuthError'
  }
}
