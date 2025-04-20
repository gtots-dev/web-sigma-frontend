import type { FormDataConverterInterface } from '../../domain/interfaces/form-data-converter.interface'

export class ConvertJsonToFormData {
  constructor(private formDataConverter: FormDataConverterInterface) {}

  execute<T extends Record<string, unknown>>(data: T): FormData {
    return this.formDataConverter.convert(data)
  }
}
