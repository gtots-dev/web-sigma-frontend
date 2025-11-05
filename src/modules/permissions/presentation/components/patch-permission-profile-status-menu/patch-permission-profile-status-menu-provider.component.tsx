'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type PatchPermissionProfileStatusMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PatchPermissionProfileStatusMenuContext = createContext<
  PatchPermissionProfileStatusMenuContextType | undefined
>(undefined)

export const PatchPermissionProfileStatusMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PatchPermissionProfileStatusMenuContext.Provider
      value={{ isOpen, open, close, toggle }}
    >
      {children}
    </PatchPermissionProfileStatusMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PatchPermissionProfileStatusMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
