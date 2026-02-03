import { MESSAGES_AUTHENTICATION } from '@/modules/shared/presentation/messages/authentication'

export class AuthMessagesError {
  private static map: Record<string, string> = {
    CredentialsSignin: MESSAGES_AUTHENTICATION['1.5']
  }

  static message(error?: string): string {
    if (!error) return this.map.Default
    return this.map[error] ?? this.map.Default
  }
}
