import { cleanPayload } from '../clean-payload.util'

describe('cleanPayload', () => {
  test('deve retornar undefined para null, undefined ou string vazia', () => {
    expect(cleanPayload(null)).toBeUndefined()
    expect(cleanPayload(undefined)).toBeUndefined()
    expect(cleanPayload('')).toBeUndefined()
    expect(cleanPayload('   ')).toBeUndefined()
  })

  test('deve limpar propriedades de objetos puros', () => {
    const input = {
      name: 'John',
      empty: '',
      nullValue: null,
      valid: 'value'
    }
    expect(cleanPayload(input)).toEqual({
      name: 'John',
      valid: 'value'
    })
  })

  test('deve preservar instâncias de FormData intactas', () => {
    const formData = new FormData()
    formData.append('username', 'admin')
    formData.append('password', '123456')

    const result = cleanPayload(formData)
    expect(result).toBe(formData)
    expect(result?.get('username')).toBe('admin')
    expect(result?.get('password')).toBe('123456')
  })

  test('deve preservar instâncias de URLSearchParams intactas', () => {
    const params = new URLSearchParams()
    params.append('query', 'test')

    const result = cleanPayload(params)
    expect(result).toBe(params)
    expect(result?.get('query')).toBe('test')
  })
})
