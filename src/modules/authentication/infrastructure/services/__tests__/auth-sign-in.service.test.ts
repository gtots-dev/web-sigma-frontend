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

  const data: AuthenticationFormType = {
    username: 'user',
    password: 'pass'
  }

  test('should call execute with correct parameters and resolve when no error', async () => {
    ;(authSignInRepositoryMock.execute as jest.Mock).mockResolvedValue({
      code: null,
      error: null,
      ok: true,
      status: 200,
      url: null
    })

    await expect(authSignInService.signIn(data)).resolves.toBeUndefined()

    expect(authSignInRepositoryMock.execute).toHaveBeenCalledWith({
      data,
      type: 'credentials',
      options: { redirect: false }
    })
  })

  test('should throw backend code when code is provided', async () => {
    ;(authSignInRepositoryMock.execute as jest.Mock).mockResolvedValue({
      code: 'INVALID_CREDENTIALS',
      error: 'true',
      ok: false,
      status: 401,
      url: null
    })

    await expect(authSignInService.signIn(data)).rejects.toThrow(new Error())
  })

  test('should throw mapped friendly message when no code is provided', async () => {
    ;(authSignInRepositoryMock.execute as jest.Mock).mockResolvedValue({
      code: null,
      error: '401',
      ok: false,
      status: 401,
      url: null
    })

    jest
      .spyOn(AuthMessagesError, 'message')
      .mockReturnValue('Invalid credentials')

    await expect(authSignInService.signIn(data)).rejects.toThrow(
      'Invalid credentials'
    )
  })
})
