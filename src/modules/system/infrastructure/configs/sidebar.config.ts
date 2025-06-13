'use client'

import {
  ArrowUpDown,
  Building2,
  FileText,
  HardDrive,
  List,
  MapPin,
  Shield,
  UserRoundPen,
  UsersRound
} from 'lucide-react'

import { PATHNAMES } from '@/modules/shared/infrastructure/configs/pathnames.config'
import { PERMISSIONS_ACCESS } from './permission-access'

export const SidebarData = {
  title: 'Operações',
  url: PATHNAMES.OPERATIONS,
  icon: Building2,
  isActive: PERMISSIONS_ACCESS.operations,
  isToExpand: true,
  items: [
    {
      title: 'Opções de operação',
      url: PATHNAMES.OPERATION_OPTIONS,
      icon: List,
      isActive: PERMISSIONS_ACCESS.optionsOperation,
      isToExpand: false,
      items: [
        {
          title: 'Contratos',
          url: PATHNAMES.CONTRACTS,
          icon: FileText,
          isActive: PERMISSIONS_ACCESS.contracts,
          isToExpand: true,
          items: [
            {
              title: 'Opções do contrato',
              url: '',
              icon: List,
              isActive: PERMISSIONS_ACCESS.optionsContract,
              isToExpand: false,
              items: [
                {
                  title: 'U.P.s',
                  url: PATHNAMES.PROCESSING_UNITS,
                  icon: HardDrive,
                  isActive: PERMISSIONS_ACCESS.processingUnits,
                  isToExpand: true,
                  items: [
                    {
                      title: 'Opções de U.P.s',
                      url: '',
                      icon: List,
                      isActive: PERMISSIONS_ACCESS.optionsProcessingUnits,
                      isToExpand: false,
                      items: [
                        {
                          title: 'Faixas',
                          url: PATHNAMES.LANES,
                          icon: ArrowUpDown,
                          isToExpand: true,
                          isActive: PERMISSIONS_ACCESS.lanes
                        }
                      ]
                    }
                  ]
                },
                {
                  title: 'Pontos',
                  url: PATHNAMES.POINTS,
                  icon: MapPin,
                  isToExpand: true,
                  isActive: PERMISSIONS_ACCESS.points
                },
                {
                  title: 'Operadores',
                  url: PATHNAMES.OPERATORS,
                  icon: UserRoundPen,
                  isToExpand: true,
                  isActive: PERMISSIONS_ACCESS.operators
                }
              ]
            }
          ]
        },
        {
          title: 'Usuários',
          url: PATHNAMES.USERS,
          icon: UsersRound,
          isToExpand: true,
          isActive: PERMISSIONS_ACCESS.users
        },
        {
          title: 'Permissões',
          url: PATHNAMES.PERMISSIONS,
          icon: Shield,
          isToExpand: true,
          isActive: PERMISSIONS_ACCESS.permissions
        }
      ]
    }
  ]
}
