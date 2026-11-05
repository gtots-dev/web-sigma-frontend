'use client'

import { useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  Button,
  type ButtonProps
} from '@/modules/shared/presentation/components/shadcn/button'
import { useTablePermissionProfile } from '../../contexts/table-permission-profiles.context'

export function PatchPermissionProfileModalTrigger({
  onClick,
  ...props
}: ButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const permissionProfile = useTablePermissionProfile()

  const handleOpen = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e)
      router.push(`${pathname}/modal/patch/${permissionProfile.id}`, {
        scroll: false
      })
    },
    [onClick, pathname, router, permissionProfile.id]
  )

  return (
    <Button
      className="justify-start w-full h-auto cursor-pointer p-1.5 ps-3 rounded-none text-sm disabled:bg-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 shadow-none"
      {...props}
      onClick={handleOpen}
    >
      Editar
    </Button>
  )
}
