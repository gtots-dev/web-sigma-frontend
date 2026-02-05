'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type AddUserFilesMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const AddUserFilesMenuContext = createContext<
  AddUserFilesMenuContextType | undefined
>(undefined)

export const AddUserFilesMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <AddUserFilesMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </AddUserFilesMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(AddUserFilesMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
