import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { HttpStatusCodeEnum } from '../../enums/status-codes.enum'
import { CredentialsValidator } from '../credentials.validator'

describe('CredentialsValidator', () => {
  test('should throw an error with UNAUTHORIZED status if username is missing', () => {
    const credentials = { username: '', password: 'password' }

    expect(() => CredentialsValidator.validate(credentials)).toThrow(
      new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    )
  })

  test('should throw an error with UNAUTHORIZED status if password is missing', () => {
    const credentials = { username: 'user', password: '' }

    expect(() => CredentialsValidator.validate(credentials)).toThrow(
      new HttpResponseError(HttpStatusCodeEnum.UNAUTHORIZED)
    )
  })

  test('should not throw an error if both username and password are provided', () => {
    const credentials = { username: 'user', password: 'password' }

    expect(() => CredentialsValidator.validate(credentials)).not.toThrow()
  })
})
