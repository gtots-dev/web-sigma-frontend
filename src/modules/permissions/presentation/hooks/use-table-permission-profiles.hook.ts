'use client'

import { useEffect, useState } from 'react'
import type { PermissionProfilesInterface } from '../../domain/interfaces/permission-profiles.interface'

export interface useTablePermissionProfilesResult {
  permissions: PermissionProfilesInterface[]
  loading: boolean
}
export function useTablePermissionProfiles(): useTablePermissionProfilesResult {
  const [permissions, setPermissionProfiles] = useState<
    PermissionProfilesInterface[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPermissionProfiles = async () => {
    setLoading(true)
    setPermissionProfiles([])
    setLoading(false)
  }

  useEffect(() => {
    fetchPermissionProfiles()
  }, [])

  return { permissions, loading }
}
