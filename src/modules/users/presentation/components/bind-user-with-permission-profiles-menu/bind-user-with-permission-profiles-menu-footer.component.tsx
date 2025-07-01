import type { ReactNode } from 'react'

interface BindUserWithPermissionProfilesMenuFooterComponentProps {
  children: ReactNode
}

export function BindUserWithPermissionProfilesMenuFooterComponent({
  children
}: BindUserWithPermissionProfilesMenuFooterComponentProps) {
  return (
    <div className="flex flex-col-reverse sm:flex-row w-full justify-end gap-5 px-5 border-t sm:px-10 sm:py-5">
      {children}
    </div>
  )
}
