import { useState, useCallback } from 'react'
import { CapturedFrame } from '@/modules/shared/domain/interfaces/capture-frame.interface'
import { DEFAULT_FPS } from './use-detect-video-fps.hook'

export interface ExtractionState {
  capturedFrames: CapturedFrame[]
  isExtracting: boolean
  isFullyReady: boolean
  extractionProgress: number
  currentExtractingFrame: number
  detectedFps: number
}

const INITIAL_STATE: ExtractionState = {
  capturedFrames: [],
  isExtracting: false,
  isFullyReady: false,
  extractionProgress: 0,
  currentExtractingFrame: 0,
  detectedFps: DEFAULT_FPS
}

/**
 * Hook responsável pelo gerenciamento de estado do processo de extração de quadros.
 */
export function useExtractionState() {
  const [state, setState] = useState<ExtractionState>(INITIAL_STATE)

  const resetState = useCallback(() => {
    setState(INITIAL_STATE)
  }, [])

  return {
    state,
    setState,
    resetState
  }
}
