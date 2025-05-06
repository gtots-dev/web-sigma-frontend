import { createContext, useContext, useState, ReactNode } from 'react'

type AddUserMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const AddUserMenuContext = createContext<AddUserMenuContextType | undefined>(
  undefined
)

export const AddUserMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <AddUserMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </AddUserMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(AddUserMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
