import type { ReactNode } from 'react'

interface ViewMorePointMenuFooterComponentProps {
  children: ReactNode
}

export function ViewMorePointMenuFooterComponent({
  children
}: ViewMorePointMenuFooterComponentProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row w-full justify-end gap-5 px-5 border-t sm:px-10 sm:py-5">
      {children}
    </div>
  )
}
