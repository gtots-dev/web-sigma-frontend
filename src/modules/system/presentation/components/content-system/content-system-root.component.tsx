import type { ReactNode } from 'react'

interface ContentSystemRootComponentProps {
  children: ReactNode
}

export default function ContentSystemRootComponent({
  children
}: ContentSystemRootComponentProps) {
  return <main className="flex flex-1 mt-16">{children}</main>
}
