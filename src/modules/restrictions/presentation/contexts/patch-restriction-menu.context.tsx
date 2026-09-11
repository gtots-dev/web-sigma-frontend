'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchRestrictionMenu,
  type UsePatchRestrictionMenuReturn
} from '../hooks/use-patch-restriction-menu.hook'

const PatchRestrictionMenuContext = createContext<
  UsePatchRestrictionMenuReturn | undefined
>(undefined)

export const PatchRestrictionMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchRestrictionMenu()
  return (
    <PatchRestrictionMenuContext.Provider value={value}>
      {children}
    </PatchRestrictionMenuContext.Provider>
  )
}

export const usePatchRestrictionMenuContext = () => {
  const context = useContext(PatchRestrictionMenuContext)
  if (!context) {
    throw new Error(
      'usePatchRestrictionMenuContext must be used within a PatchRestrictionMenuProvider'
    )
  }
  return context
}
