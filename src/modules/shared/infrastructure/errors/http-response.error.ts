export class HttpResponseError extends Error {
  constructor(status: string) {
    super(status)
    this.name = 'HttpResponseError'
  }
}
