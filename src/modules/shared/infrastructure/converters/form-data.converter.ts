import { FormDataConverterInterface } from '../../domain/interfaces/form-data-converter.interface'

export class FormDataConverter implements FormDataConverterInterface {
  convert<T extends Record<string, unknown>>(data: T): FormData {
    const formData = new FormData()
    this.appendFormData(formData, data)
    return formData
  }

  private appendFormData(
    formData: FormData,
    data: Record<string, unknown>,
    parentKey = ''
  ): void {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const value = data[key]
        const fullKey = parentKey ? `${parentKey}[${key}]` : key

        if (value instanceof File || value instanceof Blob) {
          formData.append(fullKey, value)
        } else if (
          typeof value === 'object' &&
          value !== null &&
          !(value instanceof Date)
        ) {
          this.appendFormData(formData, value as Record<string, unknown>, fullKey)
        } else if (value !== undefined && value !== null) {
          formData.append(fullKey, value === null ? 'null' : String(value));
        }
      }
    }
  }
}
