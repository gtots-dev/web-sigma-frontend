'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type PatchLaneStatusMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PatchLaneStatusMenuContext = createContext<
  PatchLaneStatusMenuContextType | undefined
>(undefined)

export const PatchLaneStatusMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PatchLaneStatusMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </PatchLaneStatusMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PatchLaneStatusMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
