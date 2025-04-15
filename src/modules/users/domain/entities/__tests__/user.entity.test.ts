import { UserEntity } from '../user.entity'

describe('UserEntity', () => {
  test('should correctly instantiate with given data', () => {
    const id = 1
    const login_name = 'root'
    const name = 'Root'
    const email = 'email@example.com'
    const company = 'Company Inc.'
    const position = 'Developer'
    const enabled = true

    const user = new UserEntity(
      id,
      login_name,
      name,
      email,
      company,
      position,
      enabled
    )

    expect(user).toMatchObject({
      id,
      login_name,
      name,
      email,
      company,
      position,
      enabled
    })
  })
})
