import type { HttpClientInterface } from '@/modules/shared/domain/interfaces/http-client.interface'
import { ExecuteRequest } from '../execute-request.service'
import type { HttpRequestConfig } from '@/modules/shared/domain/interfaces/http-request-config.interface'
import type { HttpResponse } from '@/modules/shared/domain/interfaces/http-response.interface'

describe('ExecuteRequest', () => {
  let httpClientMock: jest.Mocked<HttpClientInterface>
  let executeRequest: ExecuteRequest

  beforeEach(() => {
    httpClientMock = {
      request: jest.fn()
    } as jest.Mocked<HttpClientInterface>
    executeRequest = new ExecuteRequest(httpClientMock)
  })

  test('should call httpClient with correct config and return the response', async () => {
    const mockConfig: HttpRequestConfig = {
      url: 'https://api.example.com',
      method: 'GET'
    }

    const mockResponse: HttpResponse<string> = {
      success: true,
      status: '200',
      data: 'Success'
    }

    httpClientMock.request.mockResolvedValue(mockResponse)

    const response = await executeRequest.execute<string>(mockConfig)

    expect(httpClientMock.request).toHaveBeenCalledWith(mockConfig)
    expect(response).toBe(mockResponse)
  })

  test('should propagate errors', async () => {
    const mockConfig: HttpRequestConfig = {
      url: 'https://api.example.com',
      method: 'GET'
    }

    const mockError = new Error('Request failed')

    httpClientMock.request.mockRejectedValue(mockError)

    await expect(executeRequest.execute<string>(mockConfig)).rejects.toThrow(
      'Request failed'
    )
  })
})
