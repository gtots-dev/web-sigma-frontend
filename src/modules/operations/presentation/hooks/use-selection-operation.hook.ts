import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { OperationInterface } from '../../domain/interfaces/operation.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/config/pathnames.config'
import { GetSelectionOperationFactory } from '../../infrastructure/factories/get-selection-operation-factory'
import { SetSelectionOperationFactory } from '../../infrastructure/factories/set-selection-operation-factory'
import type { OperationEntities } from '../../domain/entities/operation.entities'

export function useSelectionOperation() {
  const getSelectionOperation = GetSelectionOperationFactory.create()
  const setSelectionOperation = SetSelectionOperationFactory.create()
  const { replace } = useRouter()

  async function setOperation(operation: OperationInterface): Promise<void> {
    try {
      await setSelectionOperation.execute(operation)
      replace(PATHNAMES.OPERATION_OPTIONS)
    } catch (error) {
      console.error('Error setting operation:', error)
    }
  }

  const getOperation = useCallback(async (): Promise<OperationEntities> => {
    const { id, name } = await getSelectionOperation.execute()
    return { id, name }
  }, [])

  return { setOperation, getOperation }
}
