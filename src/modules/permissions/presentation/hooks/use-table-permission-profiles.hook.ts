'use client'

import { useEffect, useState } from 'react'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { useParams } from 'next/navigation'

export interface useTablePermissionProfilesResult {
  permissionProfiles: PermissionProfileInterface[]
  loading: boolean
}
export function useTablePermissionProfiles(): useTablePermissionProfilesResult {
  const { operationId }: UrlParams = useParams()
  const { getPermissionProfiles, permissionProfiles } =
    usePermissionProfileStore()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getPermissionProfiles({ operationId })
      setLoading(false)
    }
    fetchData()
  }, [getPermissionProfiles])

  return { permissionProfiles, loading }
}
