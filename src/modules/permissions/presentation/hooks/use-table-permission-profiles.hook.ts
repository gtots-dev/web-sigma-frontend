'use client'

import { useEffect, useState } from 'react'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import { usePermissionProfileStore } from '../stores/permission-profile.store'

export interface useTablePermissionProfilesResult {
  permissionProfiles: PermissionProfileInterface[]
  loading: boolean
}
export function useTablePermissionProfiles(): useTablePermissionProfilesResult {
  const { getPermissionProfiles, permissionProfiles } =
    usePermissionProfileStore()
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPermissionProfiles = async () => {
    setLoading(true)
    await getPermissionProfiles()
    setLoading(false)
  }

  useEffect(() => {
    fetchPermissionProfiles()
  }, [])

  return { permissionProfiles, loading }
}
