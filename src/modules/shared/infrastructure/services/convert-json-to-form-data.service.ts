import type { FormDataConverterInterface } from '../../domain/interfaces/form-data-converter.interface'

export class ConvertJsonToFormData {
  constructor(private formDataConverter: FormDataConverterInterface) {}

  execute(data: Record<string, any>): FormData {
    return this.formDataConverter.convert(data)
  }
}
