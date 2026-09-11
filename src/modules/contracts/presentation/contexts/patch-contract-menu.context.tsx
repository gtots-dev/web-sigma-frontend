'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchContractMenu,
  type UsePatchContractMenuReturn
} from '../hooks/use-patch-contract-menu.hook'

const PatchContractMenuContext = createContext<
  UsePatchContractMenuReturn | undefined
>(undefined)

export const PatchContractMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchContractMenu()
  return (
    <PatchContractMenuContext.Provider value={value}>
      {children}
    </PatchContractMenuContext.Provider>
  )
}

export const usePatchContractMenuContext = () => {
  const context = useContext(PatchContractMenuContext)
  if (!context) {
    throw new Error(
      'usePatchContractMenuContext must be used within a PatchContractMenuProvider'
    )
  }
  return context
}
