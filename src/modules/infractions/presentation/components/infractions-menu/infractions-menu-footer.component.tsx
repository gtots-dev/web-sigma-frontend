import type { ReactNode } from 'react'

interface InfractionsMenuFooterComponentProps {
  children: ReactNode
}

export function InfractionsMenuFooterComponent({
  children
}: InfractionsMenuFooterComponentProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row w-full justify-end gap-5 pt-3">
      {children}
    </div>
  )
}
