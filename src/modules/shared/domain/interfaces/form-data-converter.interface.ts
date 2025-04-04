export interface FormDataConverterInterface {
  convert<T extends Record<string, unknown>>(data: T): FormData
}
