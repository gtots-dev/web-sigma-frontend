import type { ReactNode } from 'react'

interface PutUserStatusMenuFooterComponentProps {
  children: ReactNode
}

export function PutUserStatusMenuFooterComponent({
  children
}: PutUserStatusMenuFooterComponentProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row w-full justify-end gap-5 px-5 border-t sm:px-10 sm:py-5">
      {children}
    </div>
  )
}
