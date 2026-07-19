import type { ReactNode } from 'react'

interface InfractionsSidebarListProps {
  children: ReactNode
}

export function InfractionsSidebarList({ children }: InfractionsSidebarListProps) {
  return (
    <div
      className="flex-1 min-h-0 overflow-y-auto p-2 flex flex-col gap-1.5
        [&::-webkit-scrollbar]:w-1
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-border
        [&::-webkit-scrollbar-thumb]:rounded-full"
    >
      {children}
    </div>
  )
}
