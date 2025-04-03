import { TokenEntities } from '../token.entity'

describe('TokenEntities', () => {
  test('should correctly instantiate with given accessToken and tokenType', () => {
    const accessToken = 'access_token_example'
    const tokenType = 'Bearer'

    const token = new TokenEntities(accessToken, tokenType)

    expect(token).toEqual(
      expect.objectContaining({
        access_token: accessToken,
        token_type: tokenType
      })
    )
  })
})
