import { auth } from '@/auth'
import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { ContractSelector } from '@/modules/contracts/presentation/components/contract-selector'
import { FrameOptions } from '@/modules/system/presentation/components/frame-options'
import { CardOption } from '@/modules/system/presentation/components/card-option'
import { HeaderOptions } from '@/modules/system/presentation/components/header-options'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { MESSAGES_CONFIGURATION_CONTRACT } from '@/modules/shared/presentation/messages/configuration-contract'
import { PermissionEnum } from '@/modules/system/domain/enums/permissions.enum'
import { loadAuthContext } from '@/modules/system/presentation/contexts/load-auth.context'
import { Car, HardDrive, Map, MapPin, type LucideIcon } from 'lucide-react'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'

interface ConfigurationsPageProps {
  params: Promise<UrlParams>
}

interface ConfigurationCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function ConfigurationsPage({
  params
}: ConfigurationsPageProps) {
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

  const title = MESSAGES_CONFIGURATION_CONTRACT['17.1']
  const description = MESSAGES_CONFIGURATION_CONTRACT['17.2']
  const subDescription = MESSAGES_CONFIGURATION_CONTRACT['17.3']
  const contractSelectionMenuTitle = MESSAGES_CONFIGURATION_CONTRACT['17.8']
  const contractSelectionMenuDescription =
    MESSAGES_CONFIGURATION_CONTRACT['17.9']
  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts/${rawContractId}/contract-options`

  const operationOptions: ConfigurationCardOption[] = [
    {
      title: MESSAGES_CONFIGURATION_CONTRACT['17.6'],
      description: MESSAGES_CONFIGURATION_CONTRACT['17.7'],
      pathName: PATHNAMES.PROCESSING_UNITS(
        Number(rawOperationId),
        Number(rawContractId)
      ),
      icon: HardDrive,
      accessAllowed:
        isAdmin || userPermissions.has(PermissionEnum.PROCESSING_UNITS_VIEW)
    },
    {
      title: MESSAGES_CONFIGURATION_CONTRACT['17.4'],
      description: MESSAGES_CONFIGURATION_CONTRACT['17.5'],
      pathName: PATHNAMES.POINTS(Number(rawOperationId), Number(rawContractId)),
      icon: MapPin,
      accessAllowed: isAdmin || userPermissions.has(PermissionEnum.POINTS_VIEW)
    },
    {
      title: MESSAGES_CONFIGURATION_CONTRACT['17.11'],
      description: MESSAGES_CONFIGURATION_CONTRACT['17.12'],
      pathName: PATHNAMES.GROUPS(Number(rawOperationId), Number(rawContractId)),
      icon: Map,
      accessAllowed: isAdmin || userPermissions.has(PermissionEnum.GROUPS_VIEW)
    },
    {
      title: MESSAGES_CONFIGURATION_CONTRACT['17.13'],
      description: MESSAGES_CONFIGURATION_CONTRACT['17.14'],
      pathName: PATHNAMES.VEHICLES(
        Number(rawOperationId),
        Number(rawContractId)
      ),
      icon: Car,
      accessAllowed: isAdmin
    }
  ]

  const contractSelectedMoreInfo = contracts.find(
    (c) => c.id === Number(rawContractId)
  )

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
          <FrameOptions.NotFound
            message={MESSAGES_CONFIGURATION_CONTRACT['17.10']}
          />
        )}
      </FrameOptions.Content>
    </FrameOptions.Root>
  )
}
