export interface FormDataConverterInterface {
  convert(data: Record<string, any>): FormData
}
