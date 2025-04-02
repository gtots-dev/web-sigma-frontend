import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import type { CookieInterface } from '../../domain/interfaces/cookie-storage.interface'
import { OperationEntities } from '@/modules/operations/domain/entities/operation.entities'

export class SelectOperationRepository {
  private static readonly COOKIE_NAME = 'operation'
  private cookie: CookieInterface

  constructor(cookie: CookieInterface) {
    this.cookie = cookie
  }

  saveToCookies(operation: OperationInterface): void {
    this.cookie.set(
      SelectOperationRepository.COOKIE_NAME,
      JSON.stringify(operation),
      {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60,
        sameSite: 'strict'
      }
    )
  }

  getFromCookies(): OperationInterface | null {
    try {
      const cookieValue = this.cookie.get(SelectOperationRepository.COOKIE_NAME)
      if (!cookieValue) return null
      const { id, name } = JSON.parse(cookieValue)
      return id && name ? new OperationEntities(id, name) : null
    } catch (error) {
      console.error('Failed to parse operation cookie:', error)
      return null
    }
  }
}
