import { create } from 'zustand'
import { HttpResponseError } from '@/modules/shared/infrastructure/errors/http-response.error'
import type { UrlParams } from '@/modules/shared/domain/interfaces/url-params.interface'
import type { ViolationInterface } from '../../domain/interfaces/violation.interface'
import type { ViolationColorInterface } from '../../domain/interfaces/violation-color.interface'
import type { ViolationEntity } from '../../domain/entities/violation.entity'
import { GetViolationsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-violations-router-api.factory'
import { GetViolationColorsRouterApiFactory } from '@/modules/api/infrastructure/factories/get-violation-colors-router-api.factory'
import { PatchViolationRouterApiFactory } from '@/modules/api/infrastructure/factories/patch-violation-router-api.factory'

type ViolationState = {
  violations: ViolationEntity[]
  loading: boolean
  getViolations: ({ operationId, contractId }: UrlParams) => Promise<void>
  patchViolation: (
    { operationId, contractId, violationId }: UrlParams,
    violation: ViolationEntity
  ) => Promise<void>
}

export const useViolationStore = create<ViolationState>((set) => ({
  violations: [],
  loading: false,

  getViolations: async ({ operationId, contractId }: UrlParams) => {
    set({ loading: true })
    try {
      const getViolationsService = GetViolationsRouterApiFactory.create({
        operationId,
        contractId
      })
      const getViolationColorsService =
        GetViolationColorsRouterApiFactory.create({
          operationId,
          contractId
        })

      const [violationsResponse, colorsResponse] = await Promise.all([
        getViolationsService.execute(),
        getViolationColorsService.execute()
      ])

      const violations = violationsResponse.data ?? []
      const colors = colorsResponse.data ?? []

      const colorMap = new Map<number, string>()
      colors.forEach((c: ViolationColorInterface) => {
        colorMap.set(c.violation_id, c.color)
      })

      const mergedViolations: ViolationEntity[] = violations.map(
        (violation: ViolationInterface) => ({
          ...violation,
          color: colorMap.get(violation.id!) ?? '#000000'
        })
      )

      set({ violations: mergedViolations })
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    } finally {
      set({ loading: false })
    }
  },

  patchViolation: async (
    { operationId, contractId, violationId }: UrlParams,
    violation: ViolationEntity
  ) => {
    try {
      const patchViolationRouterApiFactory =
        PatchViolationRouterApiFactory.create({
          operationId,
          contractId,
          violationId
        })
      await patchViolationRouterApiFactory.execute(violation)

      set((state) => ({
        violations: state.violations.map((violationOld) => {
          if (String(violationOld.id) === String(violationId)) {
            return { ...violationOld, color: violation.color }
          }
          return violationOld
        })
      }))
    } catch (error) {
      if (error instanceof HttpResponseError) throw error
    }
  }
}))
