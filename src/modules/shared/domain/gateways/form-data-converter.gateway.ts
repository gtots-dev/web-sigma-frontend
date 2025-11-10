export interface FormDataConverterGateway {
  convert<T extends Record<string, unknown>>(data: T): FormData
}
