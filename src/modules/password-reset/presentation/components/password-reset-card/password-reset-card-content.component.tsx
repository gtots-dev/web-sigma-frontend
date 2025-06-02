import type { ReactNode } from 'react'

interface PasswordResetCardContentComponentProps {
  children: ReactNode
}

export function PasswordResetCardContentComponent({
  children
}: PasswordResetCardContentComponentProps) {
  return <div className="flex flex-col items-center p-[35px]">{children}</div>
}
