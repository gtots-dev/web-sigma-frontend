import type { ReactNode } from 'react'

interface PasswordResetFormCardRootComponentProps {
  children: ReactNode
}

export function PasswordResetFormCardRootComponent({
  children
}: PasswordResetFormCardRootComponentProps) {
  return <div className="flex flex-col gap-6">{children}</div>
}
