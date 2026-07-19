'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  useInfractionsMenu,
  type UseInfractionsMenuReturn
} from '../hooks/use-infractions-menu.hook'
import type { Infraction } from '../../domain/interfaces/infractions-websocket.interface'

const InfractionsMenuContext = createContext<
  UseInfractionsMenuReturn | undefined
>(undefined)

export const InfractionsMenuProvider = ({
  children,
  infractions = []
}: {
  children: ReactNode
  infractions?: Infraction[]
}) => {
  const value = useInfractionsMenu(infractions)
  return (
    <InfractionsMenuContext.Provider value={value}>
      {children}
    </InfractionsMenuContext.Provider>
  )
}

export const useInfractionsMenuContext = () => {
  const context = useContext(InfractionsMenuContext)
  if (!context) {
    throw new Error(
      'useInfractionsMenuContext must be used within a InfractionsMenuProvider'
    )
  }
  return context
}
