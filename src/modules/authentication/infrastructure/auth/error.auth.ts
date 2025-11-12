import { CredentialsSignin } from 'next-auth'

export class InvalidAuthError extends CredentialsSignin {
  public code: string
  public details?: Record<string, unknown>

  constructor(code: string, errorOptions?: Error | Record<string, unknown>) {
    const message =
      errorOptions instanceof Error
        ? errorOptions.message
        : typeof errorOptions === 'object'
          ? JSON.stringify(errorOptions)
          : 'Invalid authentication credentials'

    super(message)
    this.code = code
    this.name = 'InvalidAuthError'
    this.type = 'CredentialsSignin'
    this.details =
      errorOptions instanceof Error ? { cause: errorOptions } : errorOptions
  }
}
