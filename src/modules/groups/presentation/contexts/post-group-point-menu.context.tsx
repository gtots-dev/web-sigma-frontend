'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePontGroupPointMenu,
  type UsePostGroupPointMenuReturn
} from '../hooks/use-post-group-point-menu.hook'

const PostGroupPointMenuContext = createContext<
  UsePostGroupPointMenuReturn | undefined
>(undefined)

export const PostGroupPointMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePontGroupPointMenu()
  return (
    <PostGroupPointMenuContext.Provider value={value}>
      {children}
    </PostGroupPointMenuContext.Provider>
  )
}

export const usePostGroupPointMenuContext = () => {
  const context = useContext(PostGroupPointMenuContext)
  if (!context) {
    throw new Error(
      'usePostGroupPointMenuContext must be used within a PostGroupPointMenuProvider'
    )
  }
  return context
}
