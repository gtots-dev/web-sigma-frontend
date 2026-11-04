import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import ViolationsPage from './page'

interface ViolationsPageProps {
  params: Promise<UrlParams>
}

export default function Default(params: ViolationsPageProps) {
  return <ViolationsPage {...params} />
}
