import { PermissionProfileEntity } from '../permission-profile.entity'

describe('PermissionProfileEntity', () => {
  test('should correctly instantiate with given id, name, description, and operation_id', () => {
    const idPermissionProfile = 1
    const namePermissionProfile = 'Administrador'
    const descriptionPermissionProfile = 'Permission for master user access'
    const idOperation = 1

    const operation = new PermissionProfileEntity(
      namePermissionProfile,
      descriptionPermissionProfile,
      idPermissionProfile,
      idOperation
    )

    expect(operation).toMatchObject({
      name: namePermissionProfile,
      description: descriptionPermissionProfile,
      id: idPermissionProfile,
      operation_id: idOperation
    })
  })
})
