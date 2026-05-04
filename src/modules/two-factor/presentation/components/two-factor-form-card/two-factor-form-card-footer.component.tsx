import type { ReactNode } from 'react'

interface TwoFactorFormCardFooterComponentProps {
  children: ReactNode
}

export function TwoFactorFormCardFooterComponent({
  children
}: TwoFactorFormCardFooterComponentProps) {
  return <footer className="flex flex-col gap-5 h-full w-full mt-5">{children}</footer>
}
