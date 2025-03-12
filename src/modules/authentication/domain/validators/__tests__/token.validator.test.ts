import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '../../enums/status-codes.enum'
import { TokenValidator } from '../token.validator'

const createTokenVerifierMock = (verifyMock: jest.Mock) => ({
  verify: verifyMock
})

describe('TokenValidator', () => {
  const secret = 'test-secret'

  test('should throw UNAUTHORIZED error if verification fails', () => {
    const verifyMock = jest.fn(() => {
      throw new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    })

    const tokenVerifierMock = createTokenVerifierMock(verifyMock)
    const validator = new TokenValidator(tokenVerifierMock, secret)

    expect(() => validator.validate('invalid-token')).toThrow(
      new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    )

    expect(verifyMock).toHaveBeenCalledWith('invalid-token', secret)
  })

  test('should throw UNAUTHORIZED error if token is empty', () => {
    const verifyMock = jest.fn()
    const tokenVerifierMock = createTokenVerifierMock(verifyMock)
    const validator = new TokenValidator(tokenVerifierMock, secret)

    expect(() => validator.validate('')).toThrow(
      new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    )

    expect(verifyMock).not.toHaveBeenCalled()
  })
})
