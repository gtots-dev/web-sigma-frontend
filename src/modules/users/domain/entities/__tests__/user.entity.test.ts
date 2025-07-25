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
    const days_passwd_reg_deadline = 30
    const description = 'teste'

    const user = new UserEntity(
      login_name,
      name,
      email,
      company,
      position,
      id,
      enabled,
      days_passwd_reg_deadline,
      description
    )

    expect(user).toMatchObject({
      login_name,
      name,
      email,
      company,
      position,
      id,
      enabled,
      days_passwd_reg_deadline,
      description
    })
  })
})
