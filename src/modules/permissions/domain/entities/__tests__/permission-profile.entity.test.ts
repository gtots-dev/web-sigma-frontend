import { PermissionProfileEntity } from '../permission-profile.entity'

describe('PermissionProfileEntity', () => {
  test('should correctly instantiate with given id, name, description, and operation_id', () => {
    const idPermissionProfile = 1
    const namePermissionProfile = 'Administrador'
    const descriptionPermissionProfile = 'Permission for master user access'

    const operation = new PermissionProfileEntity(
      namePermissionProfile,
      descriptionPermissionProfile,
      idPermissionProfile,
    )

    expect(operation).toMatchObject({
      name: namePermissionProfile,
      description: descriptionPermissionProfile,
      id: idPermissionProfile,
    })
  })
})
