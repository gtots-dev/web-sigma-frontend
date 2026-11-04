import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import VehiclesPage from './page'

interface VehiclesPageProps {
  params: Promise<UrlParams>
}

export default function Default(params: VehiclesPageProps) {
  return <VehiclesPage {...params} />
}
