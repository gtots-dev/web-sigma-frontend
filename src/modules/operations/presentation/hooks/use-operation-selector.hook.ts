'use client'

import { useEffect, useState } from 'react'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { useOperationStore } from '@/modules/system/presentation/store/operation.store'

export function useOperationSelector(
  operationId: OperationInterface['id'],
  operations: OperationInterface[]
) {
  const [open, setOpen] = useState(false)
  const { operation, setOperation } = useOperationStore()

  useEffect(() => {
    if (!operationId || !operations.length) return

    const found = operations.find((op) => String(op.id) === operationId)
    if (found && found.id !== operation?.id) {
      setOperation(found)
    }
  }, [operationId, operations, setOperation, operation?.id])

  return {
    open,
    setOpen,
    operation
  }
}
