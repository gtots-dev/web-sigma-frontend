// shared/infrastructure/errors/http-response.error.ts
export class HttpResponseError extends Error {
  constructor(
    public readonly status: string,
    message: string
  ) {
    super(message)
    this.name = 'HttpResponseError'
  }
}
