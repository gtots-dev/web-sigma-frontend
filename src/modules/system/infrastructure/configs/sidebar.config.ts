import {
  ArrowUpDown,
  Building2,
  FileText,
  HardDrive,
  List,
  MapPin,
  Settings,
  Shield,
  UserRoundSearch,
  UsersRound
} from 'lucide-react'
import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { PermissionEnum } from '../../domain/enums/permissions.enum'

export function getSidebarData(operationId: number, contractId: number) {
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
              items: [
                {
                  title: 'Opções do contrato',
                  url: PATHNAMES.CONTRACTS_OPTIONS(operationId, contractId),
                  icon: List,
                  permissions: [PermissionEnum.CONTRACTS_VIEW],
                  isToExpand: true,
                  items: [
                    {
                      title: 'Configurações',
                      url: PATHNAMES.CONTRACTS_CONFIGURATIONS(
                        operationId,
                        contractId
                      ),
                      icon: List,
                      permissions: [PermissionEnum.CONTRACTS_VIEW],
                      isToExpand: true,
                      items: [
                        {
                          title: 'U.P.s',
                          url: PATHNAMES.PROCESSING_UNITS(
                            operationId,
                            contractId
                          ),
                          icon: HardDrive,
                          permissions: [
                            PermissionEnum.CONTRACTS_VIEW,
                            PermissionEnum.PROCESSING_UNITS_VIEW
                          ],
                          isToExpand: true,
                          items: [
                            {
                              title: 'Opções de U.P.s',
                              url: '',
                              icon: List,
                              permissions: [
                                PermissionEnum.CONTRACTS_VIEW,
                                PermissionEnum.PROCESSING_UNITS_VIEW
                              ],
                              isToExpand: true,
                              items: [
                                {
                                  title: 'Faixas',
                                  url: PATHNAMES.LANES(operationId, contractId),
                                  icon: ArrowUpDown,
                                  isToExpand: true,
                                  permissions: [
                                    PermissionEnum.LANES_VIEW,
                                    PermissionEnum.CONTRACTS_VIEW,
                                    PermissionEnum.PROCESSING_UNITS_VIEW
                                  ]
                                }
                              ]
                            }
                          ]
                        },
                        {
                          title: 'Pontos',
                          url: PATHNAMES.POINTS(operationId, contractId),
                          icon: MapPin,
                          isToExpand: true,
                          permissions: [
                            PermissionEnum.CONTRACTS_VIEW,
                            PermissionEnum.POINTS_VIEW
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
