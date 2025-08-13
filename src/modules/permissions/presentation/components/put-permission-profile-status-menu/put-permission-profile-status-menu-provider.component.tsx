'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type PutPermissionProfileStatusMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const PutPermissionProfileStatusMenuContext = createContext<
  PutPermissionProfileStatusMenuContextType | undefined
>(undefined)

export const PutPermissionProfileStatusMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <PutPermissionProfileStatusMenuContext.Provider
      value={{ isOpen, open, close, toggle }}
    >
      {children}
    </PutPermissionProfileStatusMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(PutPermissionProfileStatusMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
