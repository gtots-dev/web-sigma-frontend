import { useState } from 'react'
import type { PermissionProfileInterface } from '@/modules/permissions/domain/interfaces/permission-profiles.interface'

export function useSelectablePermissionProfile(isOpen: boolean) {
  const [selectedProfile, setSelectedProfile] =
    useState<PermissionProfileInterface | null>(null)

  if (!isOpen && selectedProfile !== null) {
    setSelectedProfile(null)
  }

  function toggleProfile(profile: PermissionProfileInterface | null) {
    setSelectedProfile((prev) => (prev?.id === profile?.id ? null : profile))
  }

  return {
    selectedProfile,
    toggleProfile,
    resetProfile: () => setSelectedProfile(null)
  }
}
