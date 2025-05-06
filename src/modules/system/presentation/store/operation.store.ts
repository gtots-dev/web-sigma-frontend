'use client'

import { create } from 'zustand'
import { GetSelectionOperationFactory } from '@/modules/operations/infrastructure/factories/get-selection-operation-factory'
import { SetSelectionOperationFactory } from '@/modules/operations/infrastructure/factories/set-selection-operation-factory'
import type { OperationEntities } from '@/modules/operations/domain/entities/operation.entity'

interface OperationState {
  operation: OperationEntities | null
  fetchOperation: () => Promise<void>
  setOperation: (operation: OperationEntities) => Promise<void>
}

export const useOperationStore = create<OperationState>(
  (set): OperationState => {
    return {
      operation: { id: null, name: null },

      fetchOperation: async (): Promise<void> => {
        const getSelectionOperation = GetSelectionOperationFactory.create()
        const operation = await getSelectionOperation.execute()
        set({ operation })
      },

      setOperation: async (operation: OperationEntities): Promise<void> => {
        const setSelectionOperation = SetSelectionOperationFactory.create()
        await setSelectionOperation.execute(operation)
        set({ operation })
      }
    }
  }
)
