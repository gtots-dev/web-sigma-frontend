import { ContractEntity } from '../contract.entity'

describe('ContractEntity', () => {
  test('should correctly instantiate with given data', () => {
    const id = 1
    const name = 'São Paulo'
    const alias = 'Exemplo alias'
    const cfg = 'Exemplo cfg'
    const operation_id = 1
    const enabled = true

    const contract = new ContractEntity(
      name,
      alias,
      cfg,
      operation_id,
      id,
      enabled
    )

    expect(contract).toMatchObject({
      name,
      alias,
      cfg,
      operation_id,
      id,
      enabled
    })
  })
})
