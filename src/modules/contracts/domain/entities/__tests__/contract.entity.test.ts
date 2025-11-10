import { ContractEntity } from '../contract.entity'

describe('ContractEntity', () => {
  test('should correctly instantiate with given data', () => {
    const id = 1
    const name = 'São Paulo'
    const alias = 'Exemplo alias'
    const cfg = 'Exemplo cfg'
    const enabled = true

    const contract = new ContractEntity(
      name,
      alias,
      cfg,
      id,
      enabled
    )

    expect(contract).toMatchObject({
      name,
      alias,
      cfg,
      id,
      enabled
    })
  })
})
