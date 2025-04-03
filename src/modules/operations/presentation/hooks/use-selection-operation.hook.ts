import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { OperationInterface } from '../../domain/interfaces/operation.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { GetSelectionOperationFactory } from '../../infrastructure/factories/get-selection-operation-factory'
import { SetSelectionOperationFactory } from '../../infrastructure/factories/set-selection-operation-factory'

export function useSelectionOperation() {
  const getSelectionOperation = GetSelectionOperationFactory.create()
  const setSelectionOperation = SetSelectionOperationFactory.create()

  const { replace } = useRouter()

  async function setOperation(operation: OperationInterface) {
    try {
      await setSelectionOperation.execute(operation)
      replace(PATHNAMES.OPERATION_OPTIONS)
    } catch (error) {
      console.error('Error setting operation:', error)
    }
  }

  const getOperation = useCallback(async () => {
    const { id, name } = await getSelectionOperation.execute()
    return { id, name }
  }, [])

  return { setOperation, getOperation }
}
