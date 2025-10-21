'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type EditLaneMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const EditLaneMenuContext = createContext<
  EditLaneMenuContextType | undefined
>(undefined)

export const EditLaneMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <EditLaneMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </EditLaneMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(EditLaneMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
