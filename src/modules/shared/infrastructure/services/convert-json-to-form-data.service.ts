import type { FormDataConverterGateway } from '../../domain/gateways/form-data-converter.interface'

export class ConvertJsonToFormData {
  constructor(private formDataConverter: FormDataConverterGateway) {}

  execute<T extends Record<string, unknown>>(data: T): FormData {
    return this.formDataConverter.convert(data)
  }
}
