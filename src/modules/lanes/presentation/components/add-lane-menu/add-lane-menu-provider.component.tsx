'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type AddLaneMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const AddLaneMenuContext = createContext<
  AddLaneMenuContextType | undefined
>(undefined)

export const AddLaneMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <AddLaneMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </AddLaneMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(AddLaneMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
