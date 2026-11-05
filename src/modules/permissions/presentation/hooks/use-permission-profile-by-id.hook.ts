'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { usePermissionProfileStore } from '../stores/permission-profile.store'
import type { PermissionProfileInterface } from '../../domain/interfaces/permission-profiles.interface'
import type { PermissionProfileEnableAndDisableInterface } from '../../domain/interfaces/permission-profile-enable-and-disable.interface'

export type PermissionProfileItem = PermissionProfileInterface &
  PermissionProfileEnableAndDisableInterface

export interface UsePermissionProfileByIdResult {
  permissionProfile: PermissionProfileItem | undefined
  permissionProfiles: PermissionProfileItem[]
  loading: boolean
}

export function usePermissionProfileById(
  permissionProfileId: number
): UsePermissionProfileByIdResult {
  const { operationId }: UrlParams = useParams()
  const { permissionProfiles, getPermissionProfiles } =
    usePermissionProfileStore()

  const permissionProfile = useMemo(
    () => permissionProfiles.find((pp) => pp.id === permissionProfileId),
    [permissionProfiles, permissionProfileId]
  )

  const [loading, setLoading] = useState(!permissionProfile)

  useEffect(() => {
    if (permissionProfile) return

    let active = true
    getPermissionProfiles({ operationId })
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // Busca apenas uma vez ao montar caso o perfil de permissão não esteja no store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    permissionProfile,
    permissionProfiles,
    loading: loading && !permissionProfile
  }
}
