'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchViolationMenu,
  type UsePatchViolationMenuReturn
} from '../hooks/use-patch-violation-menu.hook'

const PatchViolationMenuContext = createContext<
  UsePatchViolationMenuReturn | undefined
>(undefined)

export const PatchViolationMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchViolationMenu()
  return (
    <PatchViolationMenuContext.Provider value={value}>
      {children}
    </PatchViolationMenuContext.Provider>
  )
}

export const usePatchViolationMenuContext = () => {
  const context = useContext(PatchViolationMenuContext)
  if (!context) {
    throw new Error(
      'usePatchViolationMenuContext must be used within a PatchViolationMenuProvider'
    )
  }
  return context
}
