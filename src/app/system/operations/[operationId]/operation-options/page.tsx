import { FrameOptions } from '@/modules/system/presentation/components/frame-options'
import { CardOption } from '@/modules/system/presentation/components/card-option'
import { HeaderOptions } from '@/modules/system/presentation/components/header-options'
import { OperationModalTrigger } from '@/modules/operations/presentation/components/operation-modal-triggers'
import { GetOperationsFactory } from '@/modules/operations/infrastructure/factories/get-operations.factory'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_CONFIGURATION_OPERATION } from '@/modules/shared/presentation/messages/configuration-operation'
import { MESSAGES_OPTIONS_OPERATION } from '@/modules/shared/presentation/messages/options-operation'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'
import {
  FileText,
  Settings,
  UserRoundSearch,
  type LucideIcon
} from 'lucide-react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'

interface OperationOptionsPageProps {
  params: Promise<UrlParams>
}

interface OperationCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function OperationOptionsPage({
  params
}: OperationOptionsPageProps) {
  const { operationId: rawOperationId } = await params

  const getOperationFactory = GetOperationsFactory.create()
  const [{ hasPermission }, { data: operations }] = await Promise.all([
    getOperationAuthContext(rawOperationId),
    getOperationFactory.execute()
  ])

  const title = MESSAGES_OPTIONS_OPERATION['11.1']
  const description = MESSAGES_OPTIONS_OPERATION['11.2']
  const subDescription = MESSAGES_OPTIONS_OPERATION['11.3']
  const previousSection = '/system/operations'

  const operationOptions: OperationCardOption[] = [
    {
      title: MESSAGES_OPTIONS_OPERATION['11.4'],
      description: MESSAGES_OPTIONS_OPERATION['11.5'],
      pathName: PATHNAMES.OPERATION_CONFIGURATIONS(Number(rawOperationId)),
      icon: Settings,
      accessAllowed:
        hasPermission(PermissionEnum.USERS_VIEW) ||
        hasPermission(PermissionEnum.PERMISSIONS_VIEW)
    },
    {
      title: MESSAGES_CONFIGURATION_OPERATION['14.4'],
      description: MESSAGES_CONFIGURATION_OPERATION['14.5'],
      pathName: PATHNAMES.CONTRACTS(Number(rawOperationId)),
      icon: FileText,
      accessAllowed: hasPermission(PermissionEnum.CONTRACTS_VIEW)
    },
    {
      title: MESSAGES_OPTIONS_OPERATION['11.6'],
      description: MESSAGES_OPTIONS_OPERATION['11.7'],
      pathName: PATHNAMES.ACTIVITY_REPORT(Number(rawOperationId)),
      icon: UserRoundSearch,
      accessAllowed: hasPermission(PermissionEnum.ACTIVITY_REPORT_VIEW)
    }
  ]

  const operationSelectedMoreInfo = operations.find(
    (operation) => operation.id == rawOperationId
  )

  const accessibleOptions = operationOptions.filter(
    (option) => option.accessAllowed
  )

  return (
    <FrameOptions.Root>
      <FrameOptions.Header>
        <HeaderOptions.Root>
          <div className="flex items-center gap-3 sm:gap-4 flex-row min-w-0">
            <SectionRedirectLink.Button href={previousSection} />
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <HeaderOptions.Title>{title}</HeaderOptions.Title>
              <HeaderOptions.Description>
                {description}
              </HeaderOptions.Description>
              <HeaderOptions.SubDescription
                name={operationSelectedMoreInfo?.name}
              >
                {subDescription}
              </HeaderOptions.SubDescription>
            </div>
          </div>
          <OperationModalTrigger.Select
            operationId={rawOperationId}
            operations={operations}
          />
        </HeaderOptions.Root>
      </FrameOptions.Header>
      <FrameOptions.Content>
        {accessibleOptions.length > 0 ? (
          accessibleOptions.map((option, index) => (
            <CardOption.Root key={index} pathName={option.pathName}>
              <CardOption.Header Icon={option.icon} />
              <CardOption.Footer>
                <CardOption.Title>{option.title}</CardOption.Title>
                <CardOption.Description>
                  {option.description}
                </CardOption.Description>
              </CardOption.Footer>
            </CardOption.Root>
          ))
        ) : (
          <FrameOptions.NotFound
            message={MESSAGES_OPTIONS_OPERATION['11.10']}
          />
        )}
      </FrameOptions.Content>
    </FrameOptions.Root>
  )
}
