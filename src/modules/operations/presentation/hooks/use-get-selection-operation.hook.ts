'use client'

import { useEffect, useState } from 'react'
import { GetSelectionOperationFactory } from '@/modules/operations/infrastructure/factories/get-selection-operation-factory'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'

export function useSelectedOperation() {
  const [selectedOperation, setSelectedOperation] =
  useState<OperationInterface>({
    id: null,
    name: null
  })
  
  const fetchSelectedOperation = async () => {
    const getSelectionOperationFactory = GetSelectionOperationFactory.create()
    const operation = await getSelectionOperationFactory.execute()
    setSelectedOperation(operation)
  }

  useEffect(() => {
    fetchSelectedOperation()
  }, [])

  return selectedOperation
}
