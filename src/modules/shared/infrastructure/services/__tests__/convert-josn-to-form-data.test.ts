import type { FormDataConverterInterface } from '@/modules/shared/domain/interfaces/form-data-converter.interface'
import { ConvertJsonToFormData } from '../convert-json-to-form-data.service'

describe('ConvertJsonToFormData', () => {
  let formDataConverterMock: jest.Mocked<FormDataConverterInterface>
  let convertJsonToFormData: ConvertJsonToFormData

  beforeEach(() => {
    formDataConverterMock = {
      convert: jest.fn()
    } as jest.Mocked<FormDataConverterInterface>
    convertJsonToFormData = new ConvertJsonToFormData(formDataConverterMock)
  })

  test('should call formDataConverter.convert with correct data and return the result', () => {
    const mockData = { key: 'value', anotherKey: 42 }

    const mockFormData = new FormData()
    mockFormData.append('key', 'value')
    mockFormData.append('anotherKey', '42')

    formDataConverterMock.convert.mockReturnValue(mockFormData)

    const result = convertJsonToFormData.execute(mockData)

    expect(formDataConverterMock.convert).toHaveBeenCalledWith(mockData)
    expect(result).toBe(mockFormData)
  })
})
