import React from 'react'
import {
  Table,
  TableBody,
  TableHeader
} from '@/modules/shared/presentation/components/shadcn/table'
import { MESSAGES_OPERATIONS } from '@/modules/shared/presentation/messages/operations'
import { TableOperationHeaderRowComponent } from './table-operations-header.component'
import { TableOperationItemComponent } from './table-operations-item.component'
import { TableMessage } from '@/modules/shared/presentation/components/table-addons/table-message.component'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'

export async function TableOperationsRootComponent() {
  const getOperationFactory = GetOperationsFactory.create()
  const operations = await getOperationFactory.execute()
  const containerHeight = 69 + 36 + 53 * 10

  return (
    <section
      style={{ height: `${containerHeight}px` }}
      className="flex flex-col w-full"
    >
      <Table className="w-full overflow-x-hidden">
        <TableHeader>
          <TableOperationHeaderRowComponent />
        </TableHeader>
        <TableBody>
          {operations && operations.length > 0 ? (
            operations.map((operation, index) => (
              <TableOperationItemComponent key={index} operation={operation} />
            ))
          ) : (
            <TableMessage message={MESSAGES_OPERATIONS[4.3]} />
          )}
        </TableBody>
      </Table>
    </section>
  )
}
