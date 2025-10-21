import { create } from 'zustand'
import type { ProcessingUnitEntity } from '../../domain/entities/processing-unit.entity'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import { PostProcessingUnitRouterApiFactory } from '@/modules/api/infrastructure/factories/post-processing-unit-router-api.factory'

type ProcessingUnitState = {
  processingUnits: ProcessingUnitEntity[]
  getProcessingUnits: () => Promise<void>
  addProcessingUnit: (processingUnit: ProcessingUnitEntity) => Promise<void>
}

export const useProcessingUnitStore = create<ProcessingUnitState>((set) => ({
  processingUnits: [],

  addProcessingUnit: async (processingUnit: ProcessingUnitEntity) => {
    try {
      const postProcessingUnitRouterApiFactory =
        PostProcessingUnitRouterApiFactory.create()
      postProcessingUnitRouterApiFactory.execute(processingUnit)
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  },

  getProcessingUnits: async () => {
    try {
      const processingUnits = [
        {
          contract_id: 1,
          enabled: true,
          name: 'Maquina #2235',
          operation_id: 1,
          cfg: 
`[
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
        }
      ] as ProcessingUnitEntity[]
      set({ processingUnits })
    } catch (error) {
      if (error instanceof HttpResponseError) {
        throw error
      }
    }
  }
}))
