'use client'

import { useState } from 'react'

export interface UsePatchContractMenuReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export function usePatchContractMenu(): UsePatchContractMenuReturn {
  const [isOpen, setIsOpen] = useState(false)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen((prev) => !prev)

  return { isOpen, open, close, toggle }
}
