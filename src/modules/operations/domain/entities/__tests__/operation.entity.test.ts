import { OperationEntity } from '../operation.entity'

describe('OperationEntity', () => {
  test('should correctly instantiate with given operation and data', () => {
    const idOperation = '1'
    const nameOperation = 'Operação'

    const operation = new OperationEntity(idOperation, nameOperation)

    expect(operation).toMatchObject({
      id: idOperation,
      name: nameOperation
    })
  })
})
