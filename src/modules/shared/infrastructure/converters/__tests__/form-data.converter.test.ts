import { FormDataConverter } from '../form-data.converter'

describe('FormDataConverter', () => {
  let converter: FormDataConverter

  beforeEach(() => {
    converter = new FormDataConverter()
  })

  test('should convert a flat object to FormData', () => {
    const data = { name: 'John', age: 30 }
    const formData = converter.convert(data)

    expect(formData.get('name')).toBe('John')
    expect(formData.get('age')).toBe('30')
  })

  test('should convert a nested object to FormData', () => {
    const data = { user: { name: 'Alice', address: { city: 'NY' } } }
    const formData = converter.convert(data)

    expect(formData.get('user[name]')).toBe('Alice')
    expect(formData.get('user[address][city]')).toBe('NY')
  })

  test('should ignore undefined values', () => {
    const data = { name: undefined, email: 'test@example.com' }
    const formData = converter.convert(data)

    expect(formData.get('name')).toBeNull()
    expect(formData.get('email')).toBe('test@example.com')
  })

  test('should convert null values to string null', () => {
    const data = { description: null }
    const formData = converter.convert(data)

    expect(formData.get('description')).toBeNull()
  })
})
