'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/modules/shared/presentation/components/shadcn/table'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { LogIn } from 'lucide-react'
import { usePagination } from '@/modules/shared/presentation/hooks/use-pagination.hook'
import { PaginationLocalComponent } from '@/modules/shared/presentation/components/pagination-local/pagination-local.component'
import { MESSAGES_OPERATIONS } from '@/modules/shared/presentation/messages/operations'
import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { useSelectionOperation } from '../../hook/use-selection-operation.hook'

interface TableOperationsRootComponentProps {
  limitTo?: number
  data?: OperationInterface[] | null
}

export function TableOperationsRootComponent({
  limitTo = 10,
  data = []
}: TableOperationsRootComponentProps) {
  const {
    currentPage,
    totalPages,
    currentData,
    handlePrevious,
    handleNext,
    setCurrentPage
  } = usePagination(data, limitTo)
  const { setOperation } = useSelectionOperation()
  const sizeContainerSection = 69 + 36 + 53 * limitTo

  return (
    <section
      style={{ height: `${sizeContainerSection}px` }}
      className="flex flex-col"
    >
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-muted !border-0">
            <TableHead className="h-9 px-10 text-xs rounded-tl-lg" colSpan={3}>
              Nome
            </TableHead>
            <TableHead
              className="h-9 px-10 text-right text-xs rounded-tr-lg"
              colSpan={1}
            >
              Acessar
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData && currentData.length > 0 ? (
            currentData.map((operation: OperationInterface, index) => (
              <TableRow key={index}>
                <TableCell
                  className="px-10 text-zinc-700 dark:text-zinc-50"
                  colSpan={3}
                >
                  {operation.name}
                </TableCell>
                <TableCell className="px-10 text-right" colSpan={1}>
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setOperation(operation)}
                  >
                    <LogIn />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="!border-b bg-zinc-50 dark:bg-zinc-900">
              <TableCell
                colSpan={4}
                className="h-[52px] px-10 text-zinc-700/80 dark:text-zinc-50/80"
              >
                {MESSAGES_OPERATIONS[4.3]}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <PaginationLocalComponent
        currentPage={currentPage}
        totalPages={totalPages}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        setCurrentPage={setCurrentPage}
      />
    </section>
  )
}
