'use client'

import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { useState } from 'react'

export function usePagination(
  data: OperationInterface[] = [],
  itemsPerPage: number
) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil((data?.length ?? 0) / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = data?.slice(startIndex, startIndex + itemsPerPage)

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return {
    currentPage,
    totalPages,
    currentData,
    handlePrevious,
    handleNext,
    setCurrentPage
  }
}
