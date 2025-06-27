'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './edit-permission-profile-menu-provider.component'
import { usePermissionProfileStore } from '../../stores/permission-profile.store'
import { useTablePermissionProfile } from '../../contexts/table-permission-profiles.context'

export function EditPermissionProfileMenuTriggerComponent() {
  const { open: openDialog } = useDialog()
  const { id: permissionProfileId } = useTablePermissionProfile()
  const { getFeatures } = usePermissionProfileStore()

  const handleClick = async () => {
    await getFeatures(permissionProfileId)
    openDialog()
  }

  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={handleClick}
    >
      Editar
    </Button>
  )
}
