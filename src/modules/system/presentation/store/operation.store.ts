'use client'

import { create } from 'zustand'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'

interface OperationState {
  operations: OperationEntity[]
  operation: OperationEntity | null
  setOperations: (operations: OperationEntity[]) => void
  setOperation: (operation: OperationEntity) => Promise<void>
}

export const useOperationStore = create<OperationState>(
  (set): OperationState => {
    return {
      operations: [],
      operation: { id: null, name: null },

      setOperations: (operations: OperationEntity[]): void => {
        set({ operations })
      },

      setOperation: async (operation: OperationEntity): Promise<void> => {
        set({ operation })
      }
    }
  }
)
