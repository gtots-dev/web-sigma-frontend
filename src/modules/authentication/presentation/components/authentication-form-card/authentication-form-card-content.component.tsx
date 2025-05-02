import type { ReactNode } from "react"

interface AuthenticationFormCardContentComponentProps {
  children: ReactNode
}

export function AuthenticationFormCardContentComponent({
  children
}: AuthenticationFormCardContentComponentProps) {
  return (
    <main className="grid gap-6">
      {children}
    </main>
  )
}
