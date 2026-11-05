'use client'

import { useEffect } from 'react'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { useOperationStore } from '@/modules/system/presentation/store/operation.store'

export function useOperationSelector(
  operationId: OperationInterface['id'],
  operations: OperationInterface[]
) {
  const { operation, setOperation, setOperations } = useOperationStore()

  useEffect(() => {
    if (!operations?.length) return
    setOperations(operations)

    if (!operationId) return
    const found = operations.find((op) => String(op.id) === String(operationId))
    if (found) {
      setOperation(found)
    }
  }, [operationId, operations, setOperation, setOperations])

  return {
    operation
  }
}
