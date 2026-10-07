import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import ContractsPage from './page'

interface ContractsPageProps {
  params: Promise<UrlParams>
}

export default function Default(params: ContractsPageProps) {
  return <ContractsPage {...params} />
}
