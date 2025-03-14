import type { ReactNode } from 'react'

interface HeaderSystemTitleComponentProps {
  children: ReactNode
}

export function HeaderSystemTitleComponent({
  children
}: HeaderSystemTitleComponentProps) {
  return <h2 className='text-4xl'>{children}</h2>
}
