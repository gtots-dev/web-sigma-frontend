import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import { SectionRedirectLink } from '@/modules/shared/presentation/components/section-redirect-link'
import { Separator } from '@/modules/shared/presentation/components/shadcn/separator'
import { MESSAGES_TRAFFIC_FLOW } from '@/modules/shared/presentation/messages/traffic-flow'
import { HeaderSection } from '@/modules/system/presentation/components/header-section'
import { TrafficFlowAbsoluteClient } from '@/modules/traffic-flow/presentation/components/traffic-flow-absolute-client/traffic-flow-client'
import { TrafficFlowPercentageClient } from '@/modules/traffic-flow/presentation/components/traffic-flow-percentage-client/traffic-flow-percentage-client'
interface TrafficFlowPageProps {
  params: Promise<UrlParams>
}

interface Data {
  title: string
  description: string
}

export default async function TrafficFlowPage({
  params
}: TrafficFlowPageProps) {
  const [{ operationId: rawOperationId, contractId: rawContractId }] =
    await Promise.all([params])

  const previousSection = `/system/operations/${rawOperationId}/operation-options/contracts/${rawContractId}/configurations`

  const data: Data = {
    title: MESSAGES_TRAFFIC_FLOW['19.1'],
    description: MESSAGES_TRAFFIC_FLOW['19.2']
  }

  return (
    <main className="flex flex-col flex-1 !p-8 sm:p-10 sm:pb-0 gap-5">
      <div className="flex gap-5 flex-col lg:flex-row">
        <SectionRedirectLink.Button href={previousSection} />
        <HeaderSection.Root>
          <HeaderSection.Title>{data.title}</HeaderSection.Title>
          <HeaderSection.Description>
            {data.description}
          </HeaderSection.Description>
        </HeaderSection.Root>
      </div>
      <Separator orientation="horizontal" />
      <TrafficFlowAbsoluteClient />
      <TrafficFlowPercentageClient />
    </main>
  )
}
