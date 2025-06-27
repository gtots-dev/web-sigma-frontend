'use client'

import { create } from 'zustand'
import { GetSelectionOperationFactory } from '@/modules/operations/infrastructure/factories/get-selection-operation-factory'
import { SetSelectionOperationFactory } from '@/modules/operations/infrastructure/factories/set-selection-operation-factory'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'

interface OperationState {
  operation: OperationEntity | null
  fetchOperation: () => Promise<OperationEntity | null>
  setOperation: (operation: OperationEntity) => Promise<void>
}

export const useOperationStore = create<OperationState>(
  (set): OperationState => {
    return {
      operation: { id: null, name: null },

      fetchOperation: async (): Promise<OperationEntity | null> => {
        const getSelectionOperation = GetSelectionOperationFactory.create()
        const operation = await getSelectionOperation.execute()
        set({ operation })
        return operation || null
      },

      setOperation: async (operation: OperationEntity): Promise<void> => {
        const setSelectionOperation = SetSelectionOperationFactory.create()
        await setSelectionOperation.execute(operation)
        set({ operation })
      }
    }
  }
)
