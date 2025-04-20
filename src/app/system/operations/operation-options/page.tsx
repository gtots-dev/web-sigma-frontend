'use client'

import { useEffect, useState } from 'react'
import { CardOperationOptions } from '@/modules/operation-options/presentation/components/card-operation-options'
import { CardOption } from '@/modules/operation-options/presentation/components/card-option'
import { HeaderOptions } from '@/modules/operation-options/presentation/components/header-options'
import { SelectOperation } from '@/modules/operation-options/presentation/components/select-operation'
import { useSelectionOperation } from '@/modules/operations/presentation/hooks/use-selection-operation.hook'
import { PATHNAMES } from '@/modules/shared/infrastructure/config/pathnames.config'
import { MESSAGES_OPTIONS_OPERATION } from '@/modules/shared/presentation/messages/options-operation'
import { FileKey2, FileText, UsersRound, type LucideIcon } from 'lucide-react'

interface OperationOptions {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
}

interface Data {
  title: string
  description: string
  subDescription: string
  operationOptions: OperationOptions[]
}

export default function OperationOptionsPage() {
  const { getOperation } = useSelectionOperation()
  const [operationName, setOperationName] = useState<string | undefined>(
    undefined
  )
  const fetchOperation = async () => {
    const { name } = await getOperation()
    setOperationName(name)
  }

  useEffect(() => {
    fetchOperation()
  }, [getOperation])

  const data: Data = {
    title: MESSAGES_OPTIONS_OPERATION['11.1'],
    description: MESSAGES_OPTIONS_OPERATION['11.2'],
    subDescription: MESSAGES_OPTIONS_OPERATION['11.3'],
    operationOptions: [
      {
        title: MESSAGES_OPTIONS_OPERATION['11.4'],
        description: MESSAGES_OPTIONS_OPERATION['11.5'],
        pathName: PATHNAMES.CONTRACTS,
        icon: FileText
      },
      {
        title: MESSAGES_OPTIONS_OPERATION['11.6'],
        description: MESSAGES_OPTIONS_OPERATION['11.7'],
        pathName: PATHNAMES.USERS,
        icon: UsersRound
      },
      {
        title: MESSAGES_OPTIONS_OPERATION['11.8'],
        description: MESSAGES_OPTIONS_OPERATION['11.9'],
        pathName: PATHNAMES.PERMISSIONS,
        icon: FileKey2
      }
    ]
  }

  return (
    <CardOperationOptions.Root>
      <CardOperationOptions.Header>
        <HeaderOptions.Root>
          <div className="flex flex-col gap-1">
            <HeaderOptions.Title>{data.title}</HeaderOptions.Title>
            <HeaderOptions.Description>
              {data.description}
            </HeaderOptions.Description>
            <HeaderOptions.Description>
              {data.subDescription}
              <b className="text-primary-300 font-medium underline underline-offset-4">
                {operationName}
              </b>
            </HeaderOptions.Description>
          </div>
          <SelectOperation />
        </HeaderOptions.Root>
      </CardOperationOptions.Header>
      <CardOperationOptions.Content>
        {data.operationOptions.map((options, index) => (
          <CardOption.Root key={index} pathName={options.pathName}>
            <CardOption.Header Icon={options.icon} />
            <CardOption.Footer>
              <CardOption.Title>{options.title}</CardOption.Title>
              <CardOption.Description>
                {options.description}
              </CardOption.Description>
            </CardOption.Footer>
          </CardOption.Root>
        ))}
      </CardOperationOptions.Content>
    </CardOperationOptions.Root>
  )
}
