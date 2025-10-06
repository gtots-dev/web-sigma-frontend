'use client'

import { createContext, useContext } from 'react'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'

export const TablePermissionProfilesContext = createContext<
  | (PermissionProfileInterface & PermissionProfileEnableAndDisableInterface)
  | null
>(null)

export const useTablePermissionProfile = () => {
  const context = useContext(TablePermissionProfilesContext)
  if (!context) {
    throw new Error(
      'useTablePermissionProfiles must be used within a <TablePermissionProfiles.Item />'
    )
  }
  return context
}
