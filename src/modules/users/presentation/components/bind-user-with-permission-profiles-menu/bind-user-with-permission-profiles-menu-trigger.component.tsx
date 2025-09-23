'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useBindUserWithPermissionProfilesMenuTrigger } from '../../hooks/use-bind-user-with-permission-profiles-menu-trigger.hook'

interface BindUserWithPermissionProfilesMenuTriggerComponentProps {
  isPermittedViewContracts: boolean
  isPermittedViewPermissionsProfile: boolean
}

export function BindUserWithPermissionProfilesMenuTriggerComponent({
  isPermittedViewContracts,
  isPermittedViewPermissionsProfile
}: BindUserWithPermissionProfilesMenuTriggerComponentProps) {
  const { loadUserWithPermissionProfileBindOpenDialog } =
    useBindUserWithPermissionProfilesMenuTrigger({
      isPermittedViewContracts,
      isPermittedViewPermissionsProfile
    })
  return (
    <Button
      onClick={loadUserWithPermissionProfileBindOpenDialog}
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
    >
      Vincular Permissões
    </Button>
  )
}
