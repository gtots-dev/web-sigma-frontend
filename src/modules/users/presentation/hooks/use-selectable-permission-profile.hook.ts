import { useEffect, useState } from 'react'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'
import { useCacheSelectedBindsStore } from '../stores/cache-selecteds-binds.store'

export function useSelectablePermissionProfile(isOpen: boolean) {
  const { clearBindings } = useCacheSelectedBindsStore()
  const [selectedProfile, setSelectedProfile] =
    useState<PermissionProfileInterface | null>(null)

  function toggleProfile(profile: PermissionProfileInterface | null) {
    setSelectedProfile((prev) => (prev?.id === profile?.id ? null : profile))
  }

  useEffect(() => {
    if (!isOpen) {
      clearBindings()
      setSelectedProfile(null)
    }
  }, [isOpen])

  return {
    selectedProfile,
    toggleProfile,
    resetProfile: () => setSelectedProfile(null)
  }
}
