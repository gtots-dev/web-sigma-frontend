import type { ReactNode } from 'react'

interface TwoFactorCardContentComponentProps {
  children: ReactNode
}

export function TwoFactorCardContentComponent({
  children
}: TwoFactorCardContentComponentProps) {
  return <div className="flex flex-col items-center p-[35px]">{children}</div>
}
