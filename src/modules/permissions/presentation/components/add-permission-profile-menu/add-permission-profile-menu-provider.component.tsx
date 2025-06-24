'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type AddPermissionProfileMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const AddPermissionProfileMenuContext = createContext<
  AddPermissionProfileMenuContextType | undefined
>(undefined)

export const AddPermissionProfileMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <AddPermissionProfileMenuContext.Provider
      value={{ isOpen, open, close, toggle }}
    >
      {children}
    </AddPermissionProfileMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(AddPermissionProfileMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
