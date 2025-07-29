import { useEffect, useState } from 'react'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export function useSelectablePermissionProfile(isOpen: boolean) {
  const [selectedProfile, setSelectedProfile] =
    useState<PermissionProfileInterface | null>(null)

  function toggleProfile(profile: PermissionProfileInterface | null) {
    setSelectedProfile((prev) => (prev?.id === profile?.id ? null : profile))
  }

  useEffect(() => {
    if (!isOpen) {
      setSelectedProfile(null)
    }
  }, [isOpen])

  return {
    selectedProfile,
    toggleProfile,
    resetProfile: () => setSelectedProfile(null)
  }
}
