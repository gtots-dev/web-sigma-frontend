import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { ContractModalTrigger } from '@/modules/contracts/presentation/components/contract-modal-triggers'
import { FrameOptions } from '@/modules/system/presentation/components/frame-options'
import { CardOption } from '@/modules/system/presentation/components/card-option'
import { HeaderOptions } from '@/modules/system/presentation/components/header-options'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_OPTIONS_CONTRACT } from '@/modules/shared/presentation/messages/options-contract'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { getOperationAuthContext } from '@/modules/system/presentation/contexts/get-operation-auth.context'
import {
  MonitorDot,
  ChartLine,
  Settings,
  type LucideIcon,
  FileVideo2
} from 'lucide-react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'

interface ContractOptionsPageProps {
  params: Promise<UrlParams>
}

interface ContractCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function ContractOptionsPage({
  params
}: ContractOptionsPageProps) {
  const { operationId: rawOperationId, contractId: rawContractId } =
    await params

  const getContractFactory = GetContractsFactory.create({
    operationId: rawOperationId
  })
  const [{ hasPermission }, { data: contracts }] = await Promise.all([
    getOperationAuthContext(rawOperationId),
    getContractFactory.execute()
  ])

  const contractSelectedMoreInfo = contracts.find(
    (c) => c.id === Number(rawContractId)
  )

  const title = MESSAGES_OPTIONS_CONTRACT['16.1']
  const description = MESSAGES_OPTIONS_CONTRACT['16.2']
  const subDescription = MESSAGES_OPTIONS_CONTRACT['16.3']
  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts`

  const operationOptions: ContractCardOption[] = [
    {
      title: MESSAGES_OPTIONS_CONTRACT['16.4'],
      description: MESSAGES_OPTIONS_CONTRACT['16.5'],
      pathName: PATHNAMES.CONTRACTS_CONFIGURATIONS(
        Number(rawOperationId),
        Number(rawContractId)
      ),
      icon: Settings,
      accessAllowed:
        hasPermission(PermissionEnum.POINTS_VIEW) ||
        hasPermission(PermissionEnum.PROCESSING_UNITS_VIEW) ||
        hasPermission(PermissionEnum.GROUPS_VIEW) ||
        hasPermission(PermissionEnum.VEHICLE_TYPES_VIEW) ||
        hasPermission(PermissionEnum.VIOLATIONS_VIEW) ||
        hasPermission(PermissionEnum.RESTRICTIONS_VIEW) ||
        hasPermission(PermissionEnum.STATUS_VIEW)
    },
    {
      title: MESSAGES_OPTIONS_CONTRACT['16.9'],
      description: MESSAGES_OPTIONS_CONTRACT['16.10'],
      pathName: PATHNAMES.TRAFFIC_FLOW(
        Number(rawOperationId),
        Number(rawContractId)
      ),
      icon: ChartLine,
      accessAllowed: true
    },
    {
      title: MESSAGES_OPTIONS_CONTRACT['16.11'],
      description: MESSAGES_OPTIONS_CONTRACT['16.12'],
      pathName: PATHNAMES.MONITORING(
        Number(rawOperationId),
        Number(rawContractId)
      ),
      icon: MonitorDot,
      accessAllowed: hasPermission(PermissionEnum.STATUS_DASHBOARD_VIEW)
    },
    {
      title: MESSAGES_OPTIONS_CONTRACT['16.13'],
      description: MESSAGES_OPTIONS_CONTRACT['16.14'],
      pathName: PATHNAMES.INFRACTIONS(
        Number(rawOperationId),
        Number(rawContractId)
      ),
      icon: FileVideo2,
      accessAllowed: true
    }
  ]

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
                name={contractSelectedMoreInfo?.name}
              >
                {subDescription}
              </HeaderOptions.SubDescription>
            </div>
          </div>
          <ContractModalTrigger.Select
            contractId={Number(rawContractId)}
            contracts={contracts}
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
          <FrameOptions.NotFound message={MESSAGES_OPTIONS_CONTRACT['16.6']} />
        )}
      </FrameOptions.Content>
    </FrameOptions.Root>
  )
}
