import type { ReactNode } from 'react'

interface ContentSystemRootComponentProps {
  children: ReactNode
}

export default function ContentSystemRootComponent({
  children
}: ContentSystemRootComponentProps) {
  return <main className="flex flex-1 min-h-0 mt-16 h-[calc(100vh-4rem)] overflow-hidden">{children}</main>
}
