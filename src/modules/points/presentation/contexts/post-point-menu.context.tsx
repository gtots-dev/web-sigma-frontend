'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePostPointMenu,
  type UsePostPointMenuReturn
} from '../hooks/use-post-point-menu.hook'

const PostPointMenuContext = createContext<UsePostPointMenuReturn | undefined>(
  undefined
)

export const PostPointMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePostPointMenu()
  return (
    <PostPointMenuContext.Provider value={value}>
      {children}
    </PostPointMenuContext.Provider>
  )
}

export const usePostPointMenuContext = () => {
  const context = useContext(PostPointMenuContext)
  if (!context) {
    throw new Error(
      'usePostPointMenuContext must be used within a PostPointMenuProvider'
    )
  }
  return context
}
