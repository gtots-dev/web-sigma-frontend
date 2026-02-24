import { auth } from '@/auth'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { ContractSelector } from '@/modules/contracts/presentation/components/contract-selector'
import { FrameOptions } from '@/modules/system/presentation/components/frame-options'
import { CardOption } from '@/modules/system/presentation/components/card-option'
import { HeaderOptions } from '@/modules/system/presentation/components/header-options'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_OPTIONS_CONTRACT } from '@/modules/shared/presentation/messages/options-contract'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { ChartLine, Settings, type LucideIcon } from 'lucide-react'
import { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
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
  const [
    {
      token: JWT,
      user: { isAdmin }
    },
    { operationId: rawOperationId, contractId: rawContractId }
  ] = await Promise.all([auth(), params])

  const getContractFactory = GetContractsFactory.create({
    operationId: rawOperationId
  })
  const [{ userPermissions }, { data: contracts }] = await Promise.all([
    loadAuthContext(JWT, rawOperationId),
    getContractFactory.execute()
  ])

  const contractSelectedMoreInfo = contracts.find(
    (c) => c.id === Number(rawContractId)
  )

  const title = MESSAGES_OPTIONS_CONTRACT['16.1']
  const description = MESSAGES_OPTIONS_CONTRACT['16.2']
  const subDescription = MESSAGES_OPTIONS_CONTRACT['16.3']
  const contractSelectionMenuTitle = MESSAGES_OPTIONS_CONTRACT['16.7']
  const contractSelectionMenuDescription = MESSAGES_OPTIONS_CONTRACT['16.8']
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
        isAdmin ||
        userPermissions.has(PermissionEnum.POINTS_VIEW) ||
        userPermissions.has(PermissionEnum.PROCESSING_UNITS_VIEW)
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
    }
  ]

  const accessibleOptions = operationOptions.filter(
    (option) => option.accessAllowed
  )

  return (
    <FrameOptions.Root>
      <FrameOptions.Header>
        <HeaderOptions.Root>
          <div className="flex w-full gap-5">
            <SectionRedirectLink.Button href={previousSection} />
            <div className="flex flex-col gap-1">
              <HeaderOptions.Title>{title}</HeaderOptions.Title>
              <HeaderOptions.Description>
                {description}
              </HeaderOptions.Description>
              <HeaderOptions.SubDescription
                name={contractSelectedMoreInfo.name}
              >
                {subDescription}
              </HeaderOptions.SubDescription>
            </div>
            <ContractSelector.Root
              title={contractSelectionMenuTitle}
              description={contractSelectionMenuDescription}
              contractId={Number(rawContractId)}
              contracts={contracts}
            />
          </div>
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
