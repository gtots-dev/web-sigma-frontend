import { GetContractsFactory } from '@/modules/contracts/infrastructure/factories/get-contracts.factory'
import { ContractSelector } from '@/modules/contracts/presentation/components/contract-selector'
import { FrameOptions } from '@/modules/system/presentation/components/frame-options'
import { CardOption } from '@/modules/system/presentation/components/card-option'
import { HeaderOptions } from '@/modules/system/presentation/components/header-options'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { FileVideo2, type LucideIcon } from 'lucide-react'
import { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'

interface InfractionsOptionsPageProps {
  params: Promise<UrlParams>
}

interface InfractionsCardOption {
  title: string
  description: string
  icon: LucideIcon
  pathName: string
  accessAllowed: boolean
}

export default async function InfractionsOptionsPage({
  params
}: InfractionsOptionsPageProps) {
  const [{ operationId: rawOperationId, contractId: rawContractId }] =
    await Promise.all([params])

  const getContractFactory = GetContractsFactory.create({
    operationId: rawOperationId
  })
  const [, { data: contracts }] = await Promise.all([
    null,
    getContractFactory.execute()
  ])

  const contractSelectedMoreInfo = contracts.find(
    (c) => c.id === Number(rawContractId)
  )

  const title = 'Opções de Infrações'
  const description =
    'Selecione a opção disponível desejada relacionada às infrações do contrato.'
  const subDescription = 'Contrato selecionado'
  const contractSelectionMenuTitle = 'Selecione o Contrato'
  const contractSelectionMenuDescription =
    'Selecione um contrato abaixo para gerenciar suas funcionalidades.'
  const previousSection = PATHNAMES.INFRACTIONS(
    Number(rawOperationId),
    Number(rawContractId)
  )

  const infractionOptions: InfractionsCardOption[] = [
    {
      title: 'Registros',
      description:
        'Consulte, filtre e analise o histórico de registros de infrações salvas.',
      pathName: PATHNAMES.INFRACTIONS_RECORDS(
        Number(rawOperationId),
        Number(rawContractId)
      ),
      icon: FileVideo2,
      accessAllowed: true
    }
  ]

  return (
    <FrameOptions.Root>
      <FrameOptions.Header>
        <HeaderOptions.Root>
          <div className="flex gap-5 flex-col lg:flex-row">
            <SectionRedirectLink.Button href={previousSection} />

            <div className="flex flex-col gap-1">
              <HeaderOptions.Title>{title}</HeaderOptions.Title>
              <HeaderOptions.Description>
                {description}
              </HeaderOptions.Description>
              {contractSelectedMoreInfo && (
                <HeaderOptions.SubDescription
                  name={contractSelectedMoreInfo.name}
                >
                  {subDescription}
                </HeaderOptions.SubDescription>
              )}
            </div>
          </div>
          <ContractSelector.Root
            title={contractSelectionMenuTitle}
            description={contractSelectionMenuDescription}
            contractId={Number(rawContractId)}
            contracts={contracts}
          />
        </HeaderOptions.Root>
      </FrameOptions.Header>
      <FrameOptions.Content>
        {infractionOptions.map((option, index) => (
          <CardOption.Root key={index} pathName={option.pathName}>
            <CardOption.Header Icon={option.icon} />
            <CardOption.Footer>
              <CardOption.Title>{option.title}</CardOption.Title>
              <CardOption.Description>
                {option.description}
              </CardOption.Description>
            </CardOption.Footer>
          </CardOption.Root>
        ))}
      </FrameOptions.Content>
    </FrameOptions.Root>
  )
}
