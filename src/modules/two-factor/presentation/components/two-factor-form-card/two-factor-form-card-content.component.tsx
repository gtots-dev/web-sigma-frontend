import type { ReactNode } from 'react'

interface TwoFactorFormCardContentComponentProps {
  children: ReactNode
}

export function TwoFactorFormCardContentComponent({
  children
}: TwoFactorFormCardContentComponentProps) {
  return <main className="grid gap-6">{children}</main>
}
