import { HttpStatusCodeEnum } from '@/modules/authentication/domain/enums/status-codes.enum'
import { HttpResponseTokenValidator } from '@/modules/authentication/domain/validators/http-response-token.validator'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'

describe('HttpResponseTokenValidator', () => {
  const validResponseMock = { access_token: 'token', token_type: 'Bearer' }
  const invalidStatusMock = HttpStatusCodeEnum.UNAUTHORIZED
  const validStatusMock = HttpStatusCodeEnum.OK

  test('should throw an error with status code if response is null', () => {
    expect(() =>
      HttpResponseTokenValidator.validate(false, null, validStatusMock)
    ).toThrow(new HttpResponseError(validStatusMock))
  })

  test('should throw an error with status code if response is undefined', () => {
    expect(() =>
      HttpResponseTokenValidator.validate(false, undefined, validStatusMock)
    ).toThrow(new HttpResponseError(validStatusMock))
  })

  test('should throw an error with status code if status is not OK', () => {
    expect(() =>
      HttpResponseTokenValidator.validate(
        false,
        validResponseMock,
        invalidStatusMock
      )
    ).toThrow(new HttpResponseError(invalidStatusMock))
  })

  test('should not throw an error if response is valid and status is OK', () => {
    expect(() =>
      HttpResponseTokenValidator.validate(
        true,
        validResponseMock,
        validStatusMock
      )
    ).not.toThrow()
  })
})
