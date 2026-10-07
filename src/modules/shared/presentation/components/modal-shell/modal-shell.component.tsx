'use client'

import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { DrawerDialog } from '@/modules/shared/presentation/components/dialog-with-drawer'
import { ModalShellHeader } from './modal-shell-header.component'
import { ModalShellFooter } from './modal-shell-footer.component'

interface ModalShellProps {
  title: string
  description: string
  children?: ReactNode
  footer?: ReactNode
  contentClassName?: string
}

export function ModalShell({
  title,
  description,
  children,
  footer,
  contentClassName
}: ModalShellProps) {
  const router = useRouter()

  return (
    <DrawerDialog.Root open={true} onOpenChange={() => router.back()}>
      <DrawerDialog.Content className={contentClassName}>
        <ModalShellHeader title={title} description={description} />
        {children}
        <ModalShellFooter>{footer}</ModalShellFooter>
      </DrawerDialog.Content>
    </DrawerDialog.Root>
  )
}
