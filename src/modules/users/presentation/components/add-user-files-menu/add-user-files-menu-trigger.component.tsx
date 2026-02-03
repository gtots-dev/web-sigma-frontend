'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { usePostUserFilesMenuTrigger } from '../../hooks/use-post-user-files-menu-trigger.hook'

export function AddUserFilesMenuTriggerComponent() {
  const { loadUserPostFilesOpenDialog } = usePostUserFilesMenuTrigger()
  return (
    <Button
      onClick={loadUserPostFilesOpenDialog}
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
    >
      Anexar Documentos
    </Button>
  )
}
