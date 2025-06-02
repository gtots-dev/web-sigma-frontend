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

export const SidebarData = {
  title: 'Operações',
  url: PATHNAMES.OPERATIONS,
  icon: Building2,
  isActive: true,
  isToExpand: true,
  items: [
    {
      title: 'Opções de operação',
      url: PATHNAMES.OPERATION_OPTIONS,
      icon: List,
      isActive: true,
      isToExpand: false,
      items: [
        {
          title: 'Contratos',
          url: PATHNAMES.CONTRACTS,
          icon: FileText,
          isActive: true,
          isToExpand: true,
          items: [
            {
              title: 'Opções do contrato',
              url: PATHNAMES.CONTRACT_OPTIONS,
              icon: List,
              isActive: true,
              isToExpand: false,
              items: [
                {
                  title: 'U.P.s',
                  url: PATHNAMES.PROCESSING_UNITS,
                  icon: HardDrive,
                  isActive: true,
                  isToExpand: true,
                  items: [
                    {
                      title: 'Opções de U.P.s',
                      url: '',
                      icon: List,
                      isActive: true,
                      isToExpand: false,
                      items: [
                        {
                          title: 'Faixas',
                          url: PATHNAMES.LANES,
                          icon: ArrowUpDown,
                          isToExpand: true,
                          isActive: true
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
                  isActive: true
                },
                {
                  title: 'Operadores',
                  url: PATHNAMES.OPERATORS,
                  icon: UserRoundPen,
                  isToExpand: true,
                  isActive: true
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
          isActive: true
        },
        {
          title: 'Permissões',
          url: PATHNAMES.PERMISSIONS,
          icon: Shield,
          isToExpand: true,
          isActive: true
        }
      ]
    }
  ]
}
