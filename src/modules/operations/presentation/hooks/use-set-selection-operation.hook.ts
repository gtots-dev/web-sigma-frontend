'use client'

import { useRouter } from 'next/navigation'
import type { OperationInterface } from '../../domain/interfaces/operation.interface'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { SetSelectionOperationFactory } from '../../infrastructure/factories/set-selection-operation-factory'

export function useSetSelectOperation() {
  const { replace } = useRouter()

  function setOperation(operation: OperationInterface) {
    try {
      const setSelectionOperation = SetSelectionOperationFactory.create()
      setSelectionOperation.execute(operation)
      replace(PATHNAMES.OPERATION_OPTIONS)
    } catch (error) {
      console.error('Error setting operation:', error)
    }
  }

  return { setOperation }
}
