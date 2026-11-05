'use client'

import { useEffect, useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { ModalShell } from '@/modules/shared/presentation/components/modal-shell'
import { useModalNavigation } from '@/modules/shared/presentation/hooks/use-modal-navigation.hook'
import { PermissionProfileForm } from '../permission-profile-form'
import { useAddPermissionProfileForm } from '../../hooks/use-add-permission-profile-form.hook'
import {
  useAddPermissionProfileSubmit,
  type ExtendedPermissionProfile
} from '../../hooks/use-add-permission-profile-submit.hook'
import { useFeatureStore } from '../../stores/feature.store'

export interface PostPermissionProfileModalProps {
  title: string
  description: string
  onClose?: () => void
  onReturn?: () => void
}

export function PostPermissionProfileModal({
  title,
  description,
  onClose,
  onReturn
}: PostPermissionProfileModalProps) {
  const { handleClose } = useModalNavigation({ onClose, onReturn })
  const { methods } = useAddPermissionProfileForm()
  const { onAction } = useAddPermissionProfileSubmit()
  const { features, getFeatures } = useFeatureStore()
  const [loading, setLoading] = useState(features.length === 0)

  useEffect(() => {
    let active = true
    getFeatures()
      .catch(() => undefined)
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (permissionProfile: ExtendedPermissionProfile) =>
    onAction(permissionProfile, handleClose)

  return (
    <ModalShell.Root>
      <ModalShell.Loading when={loading} />

      <FormProvider {...methods}>
        <ModalShell.Header title={title} description={description} />
        <ModalShell.Content>
          <PermissionProfileForm.Form>
            <PermissionProfileForm.Input.Name require />
            <PermissionProfileForm.Input.Description />
            <PermissionProfileForm.Input.Features
              require
              permissions={features}
            />
          </PermissionProfileForm.Form>
        </ModalShell.Content>
        <ModalShell.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </Button>
          <PermissionProfileForm.Submit<ExtendedPermissionProfile>
            onSubmit={handleSubmit}
          />
        </ModalShell.Footer>
      </FormProvider>
    </ModalShell.Root>
  )
}
