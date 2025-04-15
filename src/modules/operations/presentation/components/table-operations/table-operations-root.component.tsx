import React from 'react'
import {
  Table,
  TableBody,
  TableHeader
} from '@/modules/shared/presentation/components/shadcn/table'
import { MESSAGES_OPERATIONS } from '@/modules/shared/presentation/messages/operations'
import { TableOperationHeaderRowComponent } from './table-operations-header-row.component'
import { TableOperationContentRowComponent } from './table-operations-content-row.component'
import { TableOperationMessageRow } from './table-operations-message-row.component'
import { getOperations } from '../../utils/get-operations.util'

export async function TableOperationsRootComponent() {
  const operations = await getOperations()
  const containerHeight = 69 + 36 + 53 * 10

  return (
    <section
      style={{ height: `${containerHeight}px` }}
      className="flex flex-col"
    >
      <Table className="w-full">
        <TableHeader>
          <TableOperationHeaderRowComponent />
        </TableHeader>
        <TableBody>
          {operations && operations.length > 0 ? (
            operations.map((operation, index) => (
              <TableOperationContentRowComponent
                key={index}
                operation={operation}
              />
            ))
          ) : (
            <TableOperationMessageRow message={MESSAGES_OPERATIONS[4.3]} />
          )}
        </TableBody>
      </Table>
    </section>
  )
}
