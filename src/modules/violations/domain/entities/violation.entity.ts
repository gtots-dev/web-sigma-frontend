import type { ViolationColorInterface } from '../interfaces/violation-color.interface'
import type { ViolationInterface } from '../interfaces/violation.interface'

export interface ViolationEntity
  extends ViolationColorInterface, ViolationInterface {}
