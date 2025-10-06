import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import type { ReactNode } from 'react'

interface PasswordResetFormCardHeaderComponentProps {
  children: ReactNode
}

export function PasswordResetFormCardHeaderComponent({
  children
}: PasswordResetFormCardHeaderComponentProps) {
  return (
    <header className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-y-3 items-start text-center">
        {children}
      </div>
      <div className="!px-4 w-full">
        <Separator className="dark:bg-zinc-800" />
      </div>
    </header>
  )
}
