import type { CookieInterface } from '@/modules/api/domain/interfaces/cookie-storage.interface'
import { CookiesRepository } from '../cookies.repository'
import { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'

describe('OperationRepository', () => {
  class MockCookieStorage implements CookieInterface {
    private storage: Record<string, string> = {}

    get(cookieName: string): string | null {
      return this.storage[cookieName] || null
    }

    set(cookieName: string, value: string): void {
      this.storage[cookieName] = value
    }
  }

  let repository: CookiesRepository
  let storage: MockCookieStorage

  beforeEach(() => {
    storage = new MockCookieStorage()
    repository = new CookiesRepository(storage, 'operation')
  })

  test('should save and retrieve operation from cookies', () => {
    const operation = new OperationEntity('123', 'Test Operation')
    repository.saveToCookies(operation)

    const retrieved = repository.getFromCookies<OperationEntity>()
    expect(retrieved).not.toBeNull()
    expect(retrieved?.id).toBe('123')
    expect(retrieved?.name).toBe('Test Operation')
  })

  test('should return null if no valid operation cookie exists', () => {
    expect(repository.getFromCookies()).toBeNull()
  })

  test('should handle invalid JSON in cookies gracefully', () => {
    storage.set('operation', 'invalid json')
    expect(repository.getFromCookies()).toBeNull()
  })
})
