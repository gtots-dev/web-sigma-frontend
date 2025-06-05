import { FormDataConverter } from '../form-data.converter'

describe('FormDataConverter', () => {
  let converter: FormDataConverter

  beforeEach(() => {
    converter = new FormDataConverter()
  })

  test('should convert simple object to FormData', () => {
    const data = {
      name: 'John',
      age: 30
    }

    const formData = converter.convert(data)

    expect(formData.get('name')).toBe('John')
    expect(formData.get('age')).toBe('30')
  })

  test('should convert nested object to FormData with keys like user[name]', () => {
    const data = {
      user: {
        name: 'Alice',
        email: 'alice@example.com'
      }
    }

    const formData = converter.convert(data)

    expect(formData.get('user[name]')).toBe('Alice')
    expect(formData.get('user[email]')).toBe('alice@example.com')
  })

  test('should append files under "files" key', () => {
    const file = new File(['file content'], 'test.txt', { type: 'text/plain' })

    const data = {
      files: [file]
    }

    const formData = converter.convert(data)

    expect(formData.getAll('files')).toHaveLength(1)
    expect(formData.get('files')).toBeInstanceOf(File)
    expect((formData.get('files') as File).name).toBe('test.txt')
  })

  test('should handle nested objects with arrays of primitives', () => {
    const data = {
      tags: ['a', 'b', 'c']
    }

    const formData = converter.convert(data)

    expect(formData.get('tags[0]')).toBe('a')
    expect(formData.get('tags[1]')).toBe('b')
    expect(formData.get('tags[2]')).toBe('c')
  })

  test('should ignore undefined or null values', () => {
    const data = {
      name: 'Jane',
      optional: undefined,
      nothing: null
    }

    const formData = converter.convert(data)

    expect(formData.get('name')).toBe('Jane')
    expect(formData.has('optional')).toBe(false)
    expect(formData.has('nothing')).toBe(false)
  })
})
