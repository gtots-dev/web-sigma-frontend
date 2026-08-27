'use client'

import { createContext, useContext, type ReactNode } from 'react'

interface FormSubmitModeContextValue {
  isPatch: boolean
}

const FormSubmitModeContext = createContext<FormSubmitModeContextValue>({
  isPatch: false
})

interface SmartFormProviderProps {
  children: ReactNode
  isPatch?: boolean
}

export function SmartFormProvider({
  children,
  isPatch = false
}: SmartFormProviderProps) {
  return (
    <FormSubmitModeContext.Provider value={{ isPatch }}>
      {children}
    </FormSubmitModeContext.Provider>
  )
}

export function useFormSubmitMode(): FormSubmitModeContextValue {
  return useContext(FormSubmitModeContext)
}
