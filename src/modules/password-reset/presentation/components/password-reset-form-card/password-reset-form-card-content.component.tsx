import type { ReactNode } from "react"

interface PasswordResetFormCardContentComponentProps {
  children: ReactNode
}

export function PasswordResetFormCardContentComponent({
  children
}: PasswordResetFormCardContentComponentProps) {
  return (
    <main className="grid gap-6">
      {children}
    </main>
  )
}
