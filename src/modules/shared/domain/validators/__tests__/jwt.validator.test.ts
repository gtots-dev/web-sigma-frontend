import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '../../../../authentication/domain/enums/status-codes.enum'
import { JwtValidator } from '../jwt.validator'

const createJwtVerifierMock = (verifyMock: jest.Mock) => ({
  verify: verifyMock
})

describe('JwtValidator', () => {
  const secret = 'test-secret'

  test('should throw UNAUTHORIZED error if verification fails', () => {
    const verifyMock = jest.fn(() => {
      throw new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    })

    const tokenVerifierMock = createJwtVerifierMock(verifyMock)
    const validator = new JwtValidator(tokenVerifierMock, secret)

    expect(() => validator.validate('invalid-token')).toThrow(
      new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    )

    expect(verifyMock).toHaveBeenCalledWith('invalid-token', secret)
  })

  test('should throw UNAUTHORIZED error if token is empty', () => {
    const verifyMock = jest.fn()
    const tokenVerifierMock = createJwtVerifierMock(verifyMock)
    const validator = new JwtValidator(tokenVerifierMock, secret)

    expect(() => validator.validate('')).toThrow(
      new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    )

    expect(verifyMock).not.toHaveBeenCalled()
  })
})
