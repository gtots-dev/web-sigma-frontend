'use client'

import { createContext, useContext } from 'react'
import type { PermissionProfilesInterface } from '../../domain/interfaces/permission-profiles.interface'

export const TablePermissionProfilesContext =
  createContext<PermissionProfilesInterface | null>(null)

export const useTablePermissionProfile = () => {
  const context = useContext(TablePermissionProfilesContext)
  if (!context) {
    throw new Error(
      'useTablePermissionProfiles must be used within a <TablePermissionProfiles.Item />'
    )
  }
  return context
}
