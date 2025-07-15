import { CardOperationOptions } from '@/modules/operation-options/presentation/components/card-operation-options'
import { CardOption } from '@/modules/operation-options/presentation/components/card-option'
import { HeaderOptions } from '@/modules/operation-options/presentation/components/header-options'
import { OperationSelector } from '@/modules/operation-options/presentation/components/operation-selector/'
import { getOperations } from '@/modules/operations/presentation/utils/get-operations.util'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_OPTIONS_OPERATION } from '@/modules/shared/presentation/messages/options-operation'
import { PERMISSIONS_ACCESS } from '@/modules/system/infrastructure/configs/permission-access'
import { FileKey2, FileText, UsersRound, type LucideIcon } from 'lucide-react'

interface OperationCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function OperationOptionsPage() {
  const operations = await getOperations()

  const title = MESSAGES_OPTIONS_OPERATION['11.1']
  const description = MESSAGES_OPTIONS_OPERATION['11.2']
  const subDescription = MESSAGES_OPTIONS_OPERATION['11.3']
  const operationSelectionMenuTitle = MESSAGES_OPTIONS_OPERATION['11.10']
  const operationSelectionMenuDescription = MESSAGES_OPTIONS_OPERATION['11.11']

  const operationOptions: OperationCardOption[] = [
    {
      title: MESSAGES_OPTIONS_OPERATION['11.4'],
      description: MESSAGES_OPTIONS_OPERATION['11.5'],
      pathName: PATHNAMES.CONTRACTS,
      icon: FileText,
      accessAllowed: PERMISSIONS_ACCESS.contracts
    },
    {
      title: MESSAGES_OPTIONS_OPERATION['11.6'],
      description: MESSAGES_OPTIONS_OPERATION['11.7'],
      pathName: PATHNAMES.USERS,
      icon: UsersRound,
      accessAllowed: PERMISSIONS_ACCESS.users
    },
    {
      title: MESSAGES_OPTIONS_OPERATION['11.8'],
      description: MESSAGES_OPTIONS_OPERATION['11.9'],
      pathName: PATHNAMES.PERMISSIONS,
      icon: FileKey2,
      accessAllowed: PERMISSIONS_ACCESS.permissions
    }
  ]

  return (
    <CardOperationOptions.Root>
      <CardOperationOptions.Header>
        <HeaderOptions.Root>
          <div className="flex flex-col gap-1">
            <HeaderOptions.Title>{title}</HeaderOptions.Title>
            <HeaderOptions.Description>{description}</HeaderOptions.Description>
            <HeaderOptions.SubDescription>
              {subDescription}
            </HeaderOptions.SubDescription>
          </div>
          <OperationSelector.Root
            title={operationSelectionMenuTitle}
            description={operationSelectionMenuDescription}
            operations={operations}
          />
        </HeaderOptions.Root>
      </CardOperationOptions.Header>
      <CardOperationOptions.Content>
        {operationOptions.map(
          (option, index) =>
            option.accessAllowed && (
              <CardOption.Root key={index} pathName={option.pathName}>
                <CardOption.Header Icon={option.icon} />
                <CardOption.Footer>
                  <CardOption.Title>{option.title}</CardOption.Title>
                  <CardOption.Description>
                    {option.description}
                  </CardOption.Description>
                </CardOption.Footer>
              </CardOption.Root>
            )
        )}
      </CardOperationOptions.Content>
    </CardOperationOptions.Root>
  )
}
