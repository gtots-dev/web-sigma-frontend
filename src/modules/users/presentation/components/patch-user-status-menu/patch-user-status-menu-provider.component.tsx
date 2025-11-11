'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type PatchUserStatusMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PatchUserStatusMenuContext = createContext<
  PatchUserStatusMenuContextType | undefined
>(undefined)

export const PatchUserStatusMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PatchUserStatusMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </PatchUserStatusMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PatchUserStatusMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
