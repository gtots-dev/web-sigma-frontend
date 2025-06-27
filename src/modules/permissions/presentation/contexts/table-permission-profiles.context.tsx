'use client'

import { createContext, useContext } from 'react'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'

export const TablePermissionProfilesContext =
  createContext<PermissionProfileInterface | null>(null)

export const useTablePermissionProfile = () => {
  const context = useContext(TablePermissionProfilesContext)
  if (!context) {
    throw new Error(
      'useTablePermissionProfiles must be used within a <TablePermissionProfiles.Item />'
    )
  }
  return context
}
