'use client'

import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

interface CardOptionRootComponentProps {
  pathName: string
  children: ReactNode
}

export function CardOptionRootComponent({
  children,
  pathName
}: CardOptionRootComponentProps) {
  const { push } = useRouter()

  return (
    <div
      className="rounded bg-white dark:bg-zinc-950 shadow-sm w-full sm:w-[300px] outline-0 outline-zinc-300 dark:outline-zinc-800
           hover:outline-1 hover:outline hover: cursor-pointer hover:bg-white/50 hover:dark:bg-zinc-950/50 transition-all duration-300"
      onClick={() => push(pathName)}
    >
      {children}
    </div>
  )
}
