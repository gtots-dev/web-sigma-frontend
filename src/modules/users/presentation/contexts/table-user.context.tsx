'use client'

import { createContext, useContext } from 'react'
import type { UserInterface } from '@/modules/users/domain/interfaces/user.interface'
import type { UserEnableAndDisableInterface } from '../../domain/interfaces/user-enable-and-disable.interface'

export const TableUserContext = createContext<
  (UserInterface & UserEnableAndDisableInterface) | null
>(null)

export const useTableUser = () => {
  const context = useContext(TableUserContext)
  if (!context) {
    throw new Error('useTableUser must be used within a <TableUsers.Item />')
  }
  return context
}
