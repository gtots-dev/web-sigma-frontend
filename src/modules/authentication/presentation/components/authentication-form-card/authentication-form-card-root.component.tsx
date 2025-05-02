import type { ReactNode } from "react"

interface AuthenticationFormCardRootComponentProps {
  children: ReactNode
}

export function AuthenticationFormCardRootComponent({
  children
}: AuthenticationFormCardRootComponentProps) {
  return (
    <div className="flex flex-col gap-6">
      {children}
    </div>
  )
}
