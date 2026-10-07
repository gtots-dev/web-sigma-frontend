import {
  MonitorDot,
  ArrowUpDown,
  Building2,
  Car,
  ChartLine,
  FileText,
  HardDrive,
  List,
  Map,
  MapPin,
  Settings,
  Shield,
  UserRoundSearch,
  FileVideo2,
  AlertTriangle,
  ShieldAlert,
  UsersRound
} from 'lucide-react'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { PermissionEnum } from '../../domain/enums/permissions.enum'

export function getSidebarData(
  operationId: number,
  contractId?: number,
  processingUnitId?: number
) {
  const hasValidContract =
    Boolean(contractId) && !isNaN(Number(contractId)) && Number(contractId) > 0

  const contractItems = hasValidContract
    ? [
        {
          title: 'Opções do contrato',
          url: PATHNAMES.CONTRACTS_OPTIONS(operationId, Number(contractId)),
          icon: List,
          permissions: [PermissionEnum.CONTRACTS_VIEW],
          isToExpand: true,
          items: [
            {
              title: 'Configurações',
              url: PATHNAMES.CONTRACTS_CONFIGURATIONS(
                operationId,
                Number(contractId)
              ),
              icon: Settings,
              permissions: [
                PermissionEnum.CONTRACTS_VIEW,
                PermissionEnum.PROCESSING_UNITS_VIEW,
                PermissionEnum.POINTS_VIEW
              ],
              isToExpand: true,
              items: [
                {
                  title: 'U.P.s',
                  url: PATHNAMES.PROCESSING_UNITS(
                    operationId,
                    Number(contractId)
                  ),
                  icon: HardDrive,
                  permissions: [
                    PermissionEnum.CONTRACTS_VIEW,
                    PermissionEnum.PROCESSING_UNITS_VIEW
                  ],
                  isToExpand: true,
                  items: [
                    {
                      title: 'Faixas',
                      url: PATHNAMES.LANES(
                        operationId,
                        Number(contractId),
                        Number(processingUnitId)
                      ),
                      icon: ArrowUpDown,
                      isToExpand: true,
                      permissions: [
                        PermissionEnum.LANES_VIEW,
                        PermissionEnum.CONTRACTS_VIEW,
                        PermissionEnum.PROCESSING_UNITS_VIEW
                      ]
                    }
                  ]
                },
                {
                  title: 'Pontos',
                  url: PATHNAMES.POINTS(operationId, Number(contractId)),
                  icon: MapPin,
                  isToExpand: true,
                  permissions: [
                    PermissionEnum.CONTRACTS_VIEW,
                    PermissionEnum.POINTS_VIEW
                  ]
                },
                {
                  title: 'Grupos',
                  url: PATHNAMES.GROUPS(operationId, Number(contractId)),
                  icon: Map,
                  isToExpand: true,
                  permissions: [
                    PermissionEnum.CONTRACTS_VIEW,
                    PermissionEnum.GROUPS_VIEW
                  ]
                },
                {
                  title: 'Tipos de Veículos',
                  url: PATHNAMES.VEHICLES(operationId, Number(contractId)),
                  icon: Car,
                  isToExpand: true,
                  permissions: [PermissionEnum.CONTRACTS_VIEW]
                },
                {
                  title: 'Violações',
                  url: PATHNAMES.VIOLATIONS(operationId, Number(contractId)),
                  icon: AlertTriangle,
                  isToExpand: true,
                  permissions: [PermissionEnum.CONTRACTS_VIEW]
                },
                {
                  title: 'Restrições',
                  url: PATHNAMES.RESTRICTIONS(
                    operationId,
                    Number(contractId)
                  ),
                  icon: ShieldAlert,
                  isToExpand: true,
                  permissions: [
                    PermissionEnum.CONTRACTS_VIEW,
                    PermissionEnum.RESTRICTIONS_VIEW
                  ]
                }
              ]
            },
            {
              title: 'Estatísticas de tráfego',
              url: PATHNAMES.TRAFFIC_FLOW(operationId, Number(contractId)),
              icon: ChartLine,
              isToExpand: true,
              permissions: [PermissionEnum.CONTRACTS_VIEW]
            },
            {
              title: 'Mapa operacional',
              url: PATHNAMES.MONITORING(operationId, Number(contractId)),
              icon: MonitorDot,
              isToExpand: true,
              permissions: [PermissionEnum.CONTRACTS_VIEW]
            },
            {
              title: 'Visualizador de registros',
              url: PATHNAMES.INFRACTIONS(operationId, Number(contractId)),
              icon: FileVideo2,
              isToExpand: true,
              permissions: [PermissionEnum.CONTRACTS_VIEW]
            }
          ]
        }
      ]
    : undefined

  return [
    {
      title: 'Operações',
      url: PATHNAMES.OPERATIONS,
      icon: Building2,
      permissions: [PermissionEnum.NOT_REQUIRED],
      isToExpand: true,
      items: [
        {
          title: 'Opções de operação',
          url: PATHNAMES.OPERATION_OPTIONS(operationId),
          icon: List,
          permissions: [PermissionEnum.NOT_REQUIRED],
          isToExpand: true,
          items: [
            {
              title: 'Configurações',
              url: PATHNAMES.OPERATION_CONFIGURATIONS(operationId),
              icon: Settings,
              permissions: [
                PermissionEnum.USERS_VIEW,
                PermissionEnum.CONTRACTS_VIEW,
                PermissionEnum.PERMISSIONS_VIEW
              ],
              isToExpand: true,
              items: [
                {
                  title: 'Usuários',
                  url: PATHNAMES.USERS(operationId),
                  icon: UsersRound,
                  isToExpand: true,
                  permissions: [PermissionEnum.USERS_VIEW]
                },
                {
                  title: 'Permissões',
                  url: PATHNAMES.PERMISSIONS(operationId),
                  icon: Shield,
                  isToExpand: true,
                  permissions: [PermissionEnum.PERMISSIONS_VIEW]
                }
              ]
            },
            {
              title: 'Relatório de Atividades',
              url: PATHNAMES.ACTIVITY_REPORT(operationId),
              icon: UserRoundSearch,
              permissions: [PermissionEnum.ACTIVITY_REPORT_VIEW],
              isToExpand: true
            },
            {
              title: 'Contratos',
              url: PATHNAMES.CONTRACTS(operationId),
              icon: FileText,
              permissions: [PermissionEnum.CONTRACTS_VIEW],
              isToExpand: true,
              items: contractItems
            }
          ]
        }
      ]
    }
  ]
}
