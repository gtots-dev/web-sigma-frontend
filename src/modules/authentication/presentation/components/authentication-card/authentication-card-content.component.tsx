import type { ReactNode } from 'react'

interface AuthenticationCardContentComponentProps {
  children: ReactNode
}

export function AuthenticationCardContentComponent({
  children
}: AuthenticationCardContentComponentProps) {
  return (
    <div className="flex flex-col items-center p-[35px] md:p-[38px] xl:p-[75px]">
      {children}
    </div>
  )
}
