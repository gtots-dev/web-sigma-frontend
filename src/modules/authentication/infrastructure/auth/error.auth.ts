import { CredentialsSignin } from 'next-auth'

export class InvalidAuthError extends CredentialsSignin {
  public code: string

  constructor(code: string, errorOptions?: Error | Record<string, unknown>) {
    super(errorOptions)
    this.code = code
    this.type = 'CredentialsSignin'
  }
}
