'use client'

import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'

export interface ModalShellRootProps {
  children?: ReactNode
  contentClassName?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ModalShellRoot({
  children,
  contentClassName,
  open,
  onOpenChange
}: ModalShellRootProps) {
  const router = useRouter()

  return (
    <DrawerDialog.Root
      open={open ?? true}
      onOpenChange={onOpenChange ?? (() => router.back())}
    >
      <DrawerDialog.Content className={contentClassName}>
        {children}
      </DrawerDialog.Content>
    </DrawerDialog.Root>
  )
}
