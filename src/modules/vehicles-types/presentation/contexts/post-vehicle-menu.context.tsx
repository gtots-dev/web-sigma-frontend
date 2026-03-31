'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePostVehicleTypeMenu,
  type usePostVehicleTypeMenuReturn
} from '../hooks/use-post-vehicle-menu.hook'

const PostVehicleMenuContext = createContext<usePostVehicleTypeMenuReturn | undefined>(
  undefined
)

export const PostVehicleMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePostVehicleTypeMenu()
  return (
    <PostVehicleMenuContext.Provider value={value}>
      {children}
    </PostVehicleMenuContext.Provider>
  )
}

export const usePostVehicleTypeMenuContext = () => {
  const context = useContext(PostVehicleMenuContext)
  if (!context) {
    throw new Error(
      'usePostVehicleTypeMenuContext must be used within a PostVehicleMenuProvider'
    )
  }
  return context
}
