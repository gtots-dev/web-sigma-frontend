'use client'

import React from 'react'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/modules/shared/presentation/components/shadcn/pagination'

interface PaginationLocalComponentProps {
  currentPage: number
  totalPages: number
  handlePrevious: () => void
  handleNext: () => void
  setCurrentPage: (page: number) => void
}

export function PaginationLocalComponent({
  currentPage,
  totalPages,
  handlePrevious,
  handleNext,
  setCurrentPage
}: PaginationLocalComponentProps) {
  if (totalPages <= 1) return null
  return (
    <Pagination className="justify-end px-10 border-t py-4 mt-auto">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevious}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              onClick={() => setCurrentPage(index + 1)}
              className={
                currentPage === index + 1
                  ? 'bg-muted text-muted-foreground disabled:bg-muted disabled:text-muted-foreground'
                  : 'cursor-pointer'
              }
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={handleNext}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
