'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { useDialog } from './view-more-user-menu-provider.component'
import { useUserFilesStore } from '../../stores/user-files.store'
import { useTableUser } from '../../contexts/table-user.context'

export function ViewMoreUserMenuTriggerComponent() {
  const { open: openDialog } = useDialog()
  const { id: userId } = useTableUser()
  const { getUserFiles } = useUserFilesStore()

  const handleClick = async () => {
    await getUserFiles(userId)
    openDialog()
  }

  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      onClick={handleClick}
    >
      Ver Mais
    </Button>
  )
}
