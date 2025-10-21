import { create } from 'zustand'
import type { LaneEntity } from '../../domain/entities/lane.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostLaneRouterApiFactory } from '@/modules/api/infrastructure/factories/post-lane-router-api.factory'

type LaneState = {
  lanes: LaneEntity[]
  getLanes: () => Promise<void>
  addLane: (lane: LaneEntity) => Promise<void>
}

export const useLaneStore = create<LaneState>((set) => ({
  lanes: [],

  addLane: async (lane: LaneEntity) => {
    try {
      const postLaneRouterApiFactory = PostLaneRouterApiFactory.create()
      postLaneRouterApiFactory.execute(lane)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  getLanes: async () => {
    try {
      const lanes = [
        {
          enabled: true,
          name: 'Faixa [1]',
          operation_id: 1,
          cfg: `[
  {
    label: 'Configurações',
    name: 'config',
    type: 'group',
    objs: [
      {
        type: 'bool',
        name: 'option',
        label: 'Opção',
        label_true: 'sim',
        label_false: 'não',
        value_default: false
      },
      {
        type: 'float',
        name: 'calibration',
        label: 'Calibração',
        value_default: '10000'
      },
      {
        type: 'int',
        name: 'count',
        label: 'Contador',
        value_default: 100
      },
      {
        type: 'text',
        name: 'username',
        label: 'Usuário',
        value_default: ''
      },
      {
        type: 'date',
        name: 'start_date',
        label: 'Data inicial',
        value_default: '20250101'
      },
      {
        type: 'hour',
        name: 'start_hour',
        label: 'Hora inicial',
        value_default: '120000'
      },
      {
        type: 'option',
        behavior: 'checkbox',
        name: 'color_check',
        label: 'Coloração (Check)',
        options: [
          { id: 'mono', name: 'Monocromático' },
          { id: 'color', name: 'Colorido' }
        ],
        default: ['mono']
      },
      {
        type: 'option',
        behavior: 'radio',
        name: 'color_radio',
        label: 'Coloração (Radio)',
        options: [
          { id: 'mono', name: 'Monocromático' },
          { id: 'color', name: 'Colorido' }
        ],
        default: ['mono']
      }
    ]
  }
]`,
          id: 1
        },
        {
          enabled: true,
          name: 'Faixa [2]',
          operation_id: 1,
          cfg: '',
          id: 2
        },
        {
          enabled: true,
          name: 'Faixa [3]',
          operation_id: 1,
          cfg: '',
          id: 3
        },
        {
          enabled: true,
          name: 'Faixa [4]',
          operation_id: 1,
          cfg: '',
          id: 4
        }
      ] as LaneEntity[]
      set({ lanes })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
