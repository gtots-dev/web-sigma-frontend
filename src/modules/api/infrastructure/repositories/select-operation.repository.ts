import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import type { CookieInterface } from '../../domain/interfaces/cookie-storage.interface'
import { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'

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
      return id && name ? new OperationEntity(id, name) : null
    } catch {
      return null
    }
  }

  removeFromCookies() {
    this.cookie.set(SelectOperationRepository.COOKIE_NAME, '', {
      httpOnly: true,
      path: '/',
      maxAge: 0
    })
  }
}
