import type { AuthenticationFormType } from '@/modules/authentication/presentation/schemas/authentication-form.schema'
import type { AuthSignInRepository } from '../../repositories/auth-sign-in.repository'
import { AuthSignInService } from '../auth-sign-in.service'
import { AuthMessagesError } from '../../errors/auth-messages.error'

describe('AuthSignInService', () => {
  let authSignInRepositoryMock: AuthSignInRepository
  let authSignInService: AuthSignInService

  beforeEach(() => {
    authSignInRepositoryMock = {
      execute: jest.fn()
    } as unknown as AuthSignInRepository

    authSignInService = new AuthSignInService(authSignInRepositoryMock)
  })

  test('should call execute on authSignIn with correct parameters', async () => {
    const data: AuthenticationFormType = {
      username: 'user',
      password: 'pass'
    }

    ;(authSignInRepositoryMock.execute as jest.Mock).mockResolvedValue({
      code: null,
      error: null
    })

    const result = await authSignInService.signIn(data)

    expect(authSignInRepositoryMock.execute).toHaveBeenCalledWith({
      data,
      type: 'credentials',
      options: { redirect: false }
    })
    expect(result).toBeNull()
  })

  test('should return an error message when an error occurs', async () => {
    const data: AuthenticationFormType = {
      username: 'user',
      password: 'pass'
    }

    const errorMessage = 'Invalid credentials'

    ;(authSignInRepositoryMock.execute as jest.Mock).mockResolvedValue({
      code: 'INVALID_CREDENTIALS',
      error: true
    })

    jest.spyOn(AuthMessagesError, 'message').mockReturnValue(errorMessage)

    await expect(authSignInService.signIn(data)).rejects.toBe(errorMessage)

    expect(authSignInRepositoryMock.execute).toHaveBeenCalledWith({
      data,
      type: 'credentials',
      options: { redirect: false }
    })
  })
})
