'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type PutLaneStatusMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PutLaneStatusMenuContext = createContext<
  PutLaneStatusMenuContextType | undefined
>(undefined)

export const PutLaneStatusMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PutLaneStatusMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </PutLaneStatusMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PutLaneStatusMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
