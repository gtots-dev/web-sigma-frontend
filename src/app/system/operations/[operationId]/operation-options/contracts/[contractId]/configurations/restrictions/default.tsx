import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import RestrictionsPage from './page'

interface RestrictionsPageProps {
  params: Promise<UrlParams>
}

export default function Default(params: RestrictionsPageProps) {
  return <RestrictionsPage {...params} />
}
