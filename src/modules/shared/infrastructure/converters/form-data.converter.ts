import { FormDataConverterInterface } from '../../domain/interfaces/form-data-converter.interface'

export class FormDataConverter implements FormDataConverterInterface {
  convert<T extends Record<string, unknown>>(data: T): FormData {
    const formData = new FormData()
    this.appendToFormData(formData, data)
    return formData
  }

  private appendToFormData(
    formData: FormData,
    data: Record<string, unknown>,
    parentKey = ''
  ): void {
    for (const key in data) {
      if (!Object.prototype.hasOwnProperty.call(data, key)) continue

      const value = data[key]
      const formKey = parentKey ? `${parentKey}[${key}]` : key

      if (
        key === 'files' &&
        Array.isArray(value) &&
        value.every((item) => item instanceof File)
      ) {
        for (const file of value) {
          formData.append('files', file)
        }
        continue
      }

      if (value instanceof File || value instanceof File) {
        formData.append(formKey, value)
        continue
      }

      const isPlainObject =
        typeof value === 'object' && value !== null && !(value instanceof Date)

      if (isPlainObject) {
        this.appendToFormData(
          formData,
          value as Record<string, unknown>,
          formKey
        )
        continue
      }

      if (value !== undefined && value !== null) {
        formData.append(formKey, String(value))
      }
    }
  }
}
