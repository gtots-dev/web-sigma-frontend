'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchPointMenu,
  type UsePatchPointMenuReturn
} from '../hooks/use-patch-point-menu.hook'

const PatchPointMenuContext = createContext<UsePatchPointMenuReturn | undefined>(
  undefined
)

export const PatchPointMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchPointMenu()
  return (
    <PatchPointMenuContext.Provider value={value}>
      {children}
    </PatchPointMenuContext.Provider>
  )
}

export const usePatchPointMenuContext = () => {
  const context = useContext(PatchPointMenuContext)
  if (!context) {
    throw new Error(
      'usePatchPointMenuContext must be used within a PatchPointMenuProvider'
    )
  }
  return context
}
