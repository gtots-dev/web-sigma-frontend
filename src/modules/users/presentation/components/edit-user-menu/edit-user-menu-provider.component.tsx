import { createContext, useContext, useState, ReactNode } from 'react'

type EditUserMenuContextType = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const EditUserMenuContext = createContext<EditUserMenuContextType | undefined>(
  undefined
)

export const EditUserMenuProviderComponent = ({
  children
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return (
    <EditUserMenuContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </EditUserMenuContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(EditUserMenuContext)
  if (!context)
    throw new Error('useDialog must be used within a DialogProvider')
  return context
}
