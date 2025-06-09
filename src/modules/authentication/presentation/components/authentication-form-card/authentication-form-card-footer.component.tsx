import type { ReactNode } from 'react'

interface AuthenticationFormCardFooterComponentProps {
  children: ReactNode
}

export function AuthenticationFormCardFooterComponent({
  children
}: AuthenticationFormCardFooterComponentProps) {
  return (
    <footer className="flex gap-2">
      <div className="h-full w-full mt-5">{children}</div>
    </footer>
  )
}
