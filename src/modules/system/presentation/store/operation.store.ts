'use client'

import { create } from 'zustand'
import type { OperationEntity } from '@/modules/operations/domain/entities/operation.entity'

interface OperationState {
  operation: OperationEntity | null
  setOperation: (operation: OperationEntity) => Promise<void>
}

export const useOperationStore = create<OperationState>(
  (set): OperationState => {
    return {
      operation: { id: null, name: null },

      setOperation: async (operation: OperationEntity): Promise<void> => {
        set({ operation })
      }
    }
  }
)
