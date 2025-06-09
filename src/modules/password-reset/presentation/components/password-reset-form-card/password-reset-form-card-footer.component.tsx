import type { ReactNode } from 'react'

interface PasswordResetFormCardFooterComponentProps {
  children: ReactNode
}

export function PasswordResetFormCardFooterComponent({
  children
}: PasswordResetFormCardFooterComponentProps) {
  return (
    <footer className="flex gap-2">
      <div className="h-full w-full mt-5">{children}</div>
    </footer>
  )
}
