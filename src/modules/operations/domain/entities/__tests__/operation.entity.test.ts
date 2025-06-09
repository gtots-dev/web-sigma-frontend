import { OperationEntities } from '../operation.entity'

describe('OperationEntities', () => {
  test('should correctly instantiate with given operation and data', () => {
    const idOperation = '1'
    const nameOperation = 'Operação'

    const operation = new OperationEntities(idOperation, nameOperation)

    expect(operation).toMatchObject({
      id: idOperation,
      name: nameOperation
    })
  })
})
