import { OperationEntities } from '../operation.entities'

describe('OperationEntities', () => {
  test('should correctly instantiate with given operation and data', () => {
    const idOperation = '1'
    const nameOperation = 'Operação'

    const operation = new OperationEntities(idOperation, nameOperation)

    expect(operation).toMatchObject({
      id: idOperation,
      name: nameOperation,
    })
  })
})
