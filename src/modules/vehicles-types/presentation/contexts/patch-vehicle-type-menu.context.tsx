'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePatchVehicleTypeMenu,
  type UsePatchVehicleTypeMenuReturn
} from '../hooks/use-patch-vehicle-type-menu.hook'

const PatchVehicleTypeMenuContext = createContext<
  UsePatchVehicleTypeMenuReturn | undefined
>(undefined)

export const PatchVehicleTypeMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePatchVehicleTypeMenu()
  return (
    <PatchVehicleTypeMenuContext.Provider value={value}>
      {children}
    </PatchVehicleTypeMenuContext.Provider>
  )
}

export const usePatchVehicleTypeMenuContext = () => {
  const context = useContext(PatchVehicleTypeMenuContext)
  if (!context) {
    throw new Error(
      'usePatchVehicleTypeMenuContext must be used within a PatchVehicleTypeMenuProvider'
    )
  }
  return context
}
