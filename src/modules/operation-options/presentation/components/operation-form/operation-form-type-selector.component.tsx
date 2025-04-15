'use client'

import type { OperationInterface } from '@/modules/operations/domain/interfaces/operation.interface'
import { Controller, useFormContext } from 'react-hook-form'

interface OperationFormTypeSelectorComponentProps {
  operations: OperationInterface[]
}

export function OperationFormTypeSelectorComponent({
  operations
}: OperationFormTypeSelectorComponentProps) {
  const { control, watch } = useFormContext()
  const searchValue = watch('search')?.toLowerCase() || ''
  const filteredOperations = operations.filter((op) =>
    op.name.toLowerCase().includes(searchValue)
  )

  return (
    <ul className="flex flex-col flex-1 overflow-auto">
      <Controller
        name="operation"
        control={control}
        render={({ field }) => (
          <>
            {filteredOperations.map(({ id, name }) => {
              const variableRadio = `${name}-${id}`
              const operationObject = { id, name }
              const stringifiedValue = JSON.stringify(operationObject)

              return (
                <li key={id}>
                  <div className="group">
                    <input
                      type="radio"
                      id={variableRadio}
                      value={stringifiedValue}
                      checked={field.value?.id === id}
                      onChange={(e) =>
                        field.onChange(JSON.parse(e.target.value))
                      }
                      className="hidden"
                    />
                    <label
                      htmlFor={variableRadio}
                      className="flex items-center gap-4 h-[55.3px] w-full px-5 border border-transparent group-has-[input:checked]:border-primary-500 dark:group-has-[input:checked]:border-primary-300 group-has-[input:checked]:bg-[#7aabfa0f]"
                    >
                      <div className="flex items-center justify-center h-3.5 w-3.5 rounded-full border border-zinc-950 dark:border-white bg-transparent">
                        <div className="w-[8.5px] h-[8.5px] bg-zinc-950 dark:bg-white rounded-full scale-0 group-has-[input:checked]:scale-100 transition-transform" />
                      </div>
                      <h4 className="text-sm">{name}</h4>
                    </label>
                  </div>
                </li>
              )
            })}
          </>
        )}
      />
    </ul>
  )
}
