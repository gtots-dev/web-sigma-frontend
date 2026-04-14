import type { ReactNode } from 'react'

interface TwoFactorFormComponentProps {
  children: ReactNode
}

export function TwoFactorFormComponent({
  children
}: TwoFactorFormComponentProps) {
  return (
    <main className="flex flex-col flex-1 h-full w-full gap-y-8">
      <form className="flex flex-1 flex-col gap-y-5 w-full">{children}</form>
    </main>
  )
}
