'use client'

import {
  ArrowUpDown,
  Building2,
  FileText,
  HardDrive,
  MapPin,
  Shield,
  UserRoundPen,
  UsersRound
} from 'lucide-react'

import { PATHNAMES } from '@/modules/shared/infrastructure/config/pathnames.config'

export const SidebarData = {
  title: 'Operações',
  url: PATHNAMES.OPERATIONS,
  icon: Building2,
  isActive: true,
  items: [
    {
      title: 'Contratos',
      url: PATHNAMES.CONTRACTS,
      icon: FileText,
      isActive: true,
      items: [
        {
          title: 'U.P.s',
          url: PATHNAMES.PROCESSING_UNITS,
          icon: HardDrive,
          isActive: true,
          items: [
            {
              title: 'Faixas',
              url: PATHNAMES.LANES,
              icon: ArrowUpDown,
              isActive: true
            }
          ]
        },
        {
          title: 'Pontos',
          url: PATHNAMES.POINTS,
          icon: MapPin,
          isActive: true
        },
        {
          title: 'Operadores',
          url: PATHNAMES.OPERATORS,
          icon: UserRoundPen,
          isActive: true
        }
      ]
    },
    {
      title: 'Usuários',
      url: PATHNAMES.USERS,
      icon: UsersRound,
      isActive: true
    },
    {
      title: 'Permissões',
      url: PATHNAMES.PERMISSIONS,
      icon: Shield,
      isActive: true
    }
  ]
}
