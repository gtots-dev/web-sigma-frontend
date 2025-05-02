import { ConvertJsonToFormData } from '../services/convert-json-to-form-data.service'
import { FormDataConverter } from '../converters/form-data.converter'

export class FormDataConverterFactory {
  static create(): ConvertJsonToFormData {
    const converter = new FormDataConverter()
    return new ConvertJsonToFormData(converter)
  }
}
