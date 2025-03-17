import { useInitialsFromText } from '../use-initials-from-text.hook'

describe('useInitialsFromText', () => {
  test('should return the initials of a full name', () => {
    const { getInitials } = useInitialsFromText()
    expect(getInitials('João Silva')).toBe('JS')
  })

  test('should return the first two letters if there is only one name', () => {
    const { getInitials } = useInitialsFromText()
    expect(getInitials('Maria')).toBe('MA')
  })

  test('should ignore extra spaces and return the correct initials', () => {
    const { getInitials } = useInitialsFromText()
    expect(getInitials('  Carlos    Souza  ')).toBe('CS')
  })

  test('should handle names with more than two words and take the initials of the first two', () => {
    const { getInitials } = useInitialsFromText()
    expect(getInitials('Ana Maria Braga')).toBe('AM')
  })
})
