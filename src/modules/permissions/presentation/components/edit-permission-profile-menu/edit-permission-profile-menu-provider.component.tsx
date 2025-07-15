'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type EditPermissionProfileMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const EditPermissionProfileMenuContext = createContext<
  EditPermissionProfileMenuContextType | undefined
>(undefined)

export const EditPermissionProfileMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <EditPermissionProfileMenuContext.Provider
      value={{ isOpen, open, close, toggle }}
    >
      {children}
    </EditPermissionProfileMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(EditPermissionProfileMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
