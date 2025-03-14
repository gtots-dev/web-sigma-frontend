import { FormDataConverterInterface } from '../../domain/interfaces/form-data-converter.interface'

export class FormDataConverter implements FormDataConverterInterface {
  convert(data: Record<string, any>): FormData {
    const formData = new FormData()
    this.appendFormData(formData, data)
    return formData
  }

  private appendFormData(
    formData: FormData,
    data: Record<string, any>,
    parentKey = ''
  ): void {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const value = data[key]
        const fullKey = parentKey ? `${parentKey}[${key}]` : key

        if (value instanceof File) {
          formData.append(fullKey, value)
        } else if (typeof value === 'object' && value !== null) {
          this.appendFormData(formData, value, fullKey)
        } else {
          formData.append(fullKey, value)
        }
      }
    }
  }
}
