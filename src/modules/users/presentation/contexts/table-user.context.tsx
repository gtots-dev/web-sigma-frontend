'use client'

import { createContext, useContext } from 'react'
import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'

export const TableUserContext = createContext<UserInterface | null>(null)

export const useTableUser = () => {
  const context = useContext(TableUserContext)
  if (!context) {
    throw new Error('useTableUser must be used within a <TableUsers.Item />')
  }
  return context
}
