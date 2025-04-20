import { handleRedirectToOperationsUtil } from '@/modules/shared/presentation/utils/handle-redirect-to-operations.util'
import { PATHNAMES } from '../../../infrastructure/config/pathnames.config'

jest.mock('../../../factories/jwt-decode.factory', () => ({
  JwtTokenDecodeFactory: {
    create: () => ({
      decode: (token: string) => {
        if (token === 'valid-token') return { operation_ids: [123, 456] }
        if (token === 'single-operation') return { operation_ids: [999] }
        return { operation_ids: [] }
      }
    })
  }
}))

describe('handleRedirectToOperations', () => {
  const baseUrl = 'https://example.com'

  test('should return shouldRedirect false if accessToken is undefined', () => {
    const result = handleRedirectToOperationsUtil({
      pathname: PATHNAMES.SYSTEM,
      accessToken: undefined,
      baseUrl
    })

    expect(result.shouldRedirect).toBe(false)
  })

  test('should return shouldRedirect false if there are no operation_ids', () => {
    const result = handleRedirectToOperationsUtil({
      pathname: PATHNAMES.SYSTEM,
      accessToken: 'no-operations',
      baseUrl
    })

    expect(result.shouldRedirect).toBe(false)
  })

  test('should redirect to OPERATIONS if there are multiple operation_ids', () => {
    const result = handleRedirectToOperationsUtil({
      pathname: PATHNAMES.SYSTEM,
      accessToken: 'valid-token',
      baseUrl
    })

    expect(result.shouldRedirect).toBe(true)
    expect(result.redirectUrl).toBe(`${baseUrl}${PATHNAMES.OPERATIONS}`)
    expect(result.selectedOperationId).toBeUndefined()
  })

  test('should redirect to OPERATION_OPTIONS and return selectedOperationId if there is only one operation_id', () => {
    const result = handleRedirectToOperationsUtil({
      pathname: PATHNAMES.SYSTEM,
      accessToken: 'single-operation',
      baseUrl
    })

    expect(result.shouldRedirect).toBe(true)
    expect(result.redirectUrl).toBe(`${baseUrl}${PATHNAMES.OPERATION_OPTIONS}`)
    expect(result.selectedOperationId).toBe('999')
  })

  test('should not redirect if the pathname is not SYSTEM', () => {
    const result = handleRedirectToOperationsUtil({
      pathname: '/some-other-path',
      accessToken: 'valid-token',
      baseUrl
    })

    expect(result.shouldRedirect).toBe(false)
  })
})
