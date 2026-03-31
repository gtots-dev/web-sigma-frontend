'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePostVehicleMenu,
  type UsePostVehicleMenuReturn
} from '../hooks/use-post-vehicle-menu.hook'

const PostVehicleMenuContext = createContext<UsePostVehicleMenuReturn | undefined>(
  undefined
)

export const PostVehicleMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePostVehicleMenu()
  return (
    <PostVehicleMenuContext.Provider value={value}>
      {children}
    </PostVehicleMenuContext.Provider>
  )
}

export const usePostVehicleMenuContext = () => {
  const context = useContext(PostVehicleMenuContext)
  if (!context) {
    throw new Error(
      'usePostVehicleMenuContext must be used within a PostVehicleMenuProvider'
    )
  }
  return context
}
