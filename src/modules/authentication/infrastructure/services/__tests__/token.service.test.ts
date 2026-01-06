import type { ExecuteRequest } from '@/modules/shared/infrastructure/services/execute-request.service'
import { TokenService } from '../token.service'
import { JwtValidator } from '@/modules/shared/domain/validators/jwt.validator'
import type { UserCredentialsInterface } from '@/modules/authentication/domain/interfaces/user-credentials.interface'
import type { OAuthResponseInterface } from '@/modules/authentication/domain/interfaces/o-auth-response.interface'
import type { HttpResponseInterface } from '@/modules/shared/domain/interfaces/http-response.interface'
import { TokenEntities } from '@/modules/authentication/domain/entities/token.entity'
import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

jest.mock('@/modules/shared/infrastructure/services/execute-request.service')
jest.mock('@/modules/shared/domain/validators/jwt.validator')

describe('TokenService', () => {
  let tokenService: TokenService
  let executeRequestMock: jest.Mocked<ExecuteRequest>
  let tokenValidatorMock: jest.Mocked<JwtValidator>
  const invalidStatusMock = Number(HttpStatusCodeEnum.UNAUTHORIZED)
  const validStatusMock = Number(HttpStatusCodeEnum.OK)

  beforeEach(() => {
    executeRequestMock = {
      execute: jest.fn()
    } as unknown as jest.Mocked<ExecuteRequest>

    tokenValidatorMock = {
      validate: jest.fn()
    } as unknown as jest.Mocked<JwtValidator>

    tokenService = new TokenService(executeRequestMock, tokenValidatorMock)
  })

  test('should retrieve a valid token when credentials are correct', async () => {
    const mockCredentials: UserCredentialsInterface = {
      username: 'user',
      password: 'pass'
    }

    const mockResponse: HttpResponseInterface<OAuthResponseInterface> = {
      success: true,
      data: {
        access_token: 'fakeAccessToken123',
        token_type: 'Bearer'
      },
      status: validStatusMock
    }

    executeRequestMock.execute.mockResolvedValue(mockResponse)

    const token = await tokenService.getToken(mockCredentials)

    expect(token).toBeInstanceOf(TokenEntities)
    expect(token.access_token).toBe('fakeAccessToken123')
    expect(token.token_type).toBe('Bearer')

    expect(executeRequestMock.execute).toHaveBeenCalledTimes(1)
  })

  test('should throw an error when the request fails', async () => {
    const mockCredentials: UserCredentialsInterface = {
      username: 'user',
      password: 'pass'
    }

    executeRequestMock.execute.mockRejectedValue(
      new HttpResponseError('invalid credentials', invalidStatusMock)
    )

    await expect(tokenService.getToken(mockCredentials)).rejects.toThrow(
      HttpResponseError
    )

    expect(executeRequestMock.execute).toHaveBeenCalledTimes(1)
  })
})
