import { handleRedirectToOperationsUtil } from "../handle-redirect-to-operations.util"

describe('handleRedirectToOperationsUtil', () => {
  const baseDeps = {
    getAuthToken: jest.fn(),
    decodeToken: jest.fn(),
    getOperations: jest.fn(),
    createOperation: jest.fn(),
    saveOperationToCookies: jest.fn(),
    getRedirectUrl: jest.fn(),
  }

  const systemPath = '/system'

  test('should return null if not system path', async () => {
    const result = await handleRedirectToOperationsUtil('/other', systemPath, baseDeps)
    expect(result).toBeNull()
  })

  test('should return redirect to login if no token', async () => {
    const deps = {
      ...baseDeps,
      getAuthToken: jest.fn().mockResolvedValue(null),
      getRedirectUrl: jest.fn().mockReturnValue('/login'),
    }

    const result = await handleRedirectToOperationsUtil(systemPath, systemPath, deps)
    expect(result).toBe('/login')
  })

  test('should redirect to OPERATION_OPTIONS if single operation', async () => {
    const deps = {
      ...baseDeps,
      getAuthToken: jest.fn().mockResolvedValue({ access_token: 'token' }),
      decodeToken: jest.fn().mockReturnValue({ operation_ids: ['1'] }),
      getOperations: jest.fn().mockResolvedValue([{ id: '1' }]),
      createOperation: jest.fn().mockReturnValue({ id: '1' }),
      saveOperationToCookies: jest.fn(),
      getRedirectUrl: jest.fn().mockReturnValue('/operation-options'),
    }

    const result = await handleRedirectToOperationsUtil(systemPath, systemPath, deps)
    expect(result).toBe('/operation-options')
    expect(deps.saveOperationToCookies).toHaveBeenCalled()
  })
})
