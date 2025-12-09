'use client'

import { createContext, useContext, ReactNode } from 'react'
import {
  usePostGroupMenu,
  type UsePostGroupMenuReturn
} from '../hooks/use-post-group-menu.hook'

const PostGroupMenuContext = createContext<UsePostGroupMenuReturn | undefined>(
  undefined
)

export const PostGroupMenuProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const value = usePostGroupMenu()
  return (
    <PostGroupMenuContext.Provider value={value}>
      {children}
    </PostGroupMenuContext.Provider>
  )
}

export const usePostGroupMenuContext = () => {
  const context = useContext(PostGroupMenuContext)
  if (!context) {
    throw new Error(
      'usePostGroupMenuContext must be used within a PostGroupMenuProvider'
    )
  }
  return context
}
