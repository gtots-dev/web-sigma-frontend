import type { AuthSignOutRepository } from '../../repositories/auth-sign-out.repository'
import { AuthSignOutService } from '../auth-sign-out.service'

describe('AuthSignOutService', () => {
  let authSignOutRepositoryMock: AuthSignOutRepository
  let authSignOutService: AuthSignOutService

  beforeEach(() => {
    authSignOutRepositoryMock = {
      execute: jest.fn()
    } as unknown as AuthSignOutRepository

    authSignOutService = new AuthSignOutService(authSignOutRepositoryMock)
  })

  test('should call execute on authSignOut with the correct options', async () => {
    await authSignOutService.signOut()

    expect(authSignOutRepositoryMock.execute).toHaveBeenCalledWith({
      options: {
        redirect: false
      }
    })
  })
})
