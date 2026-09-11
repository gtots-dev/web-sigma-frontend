'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PostRestrictionMenu } from '.'
import { usePostRestrictionMenuContext } from '../../contexts/post-restriction-menu.context'
import { usePostRestrictionSubmit } from '../../hooks/use-post-restriction-submit.hook'
import { RestrictionForm } from '../restriction-form'
import type { RestrictionEntity } from '@/modules/restrictions/domain/entities/restriction.entity'

interface PostRestrictionMenuComponentProps {
  title: string
  description: string
}

export function PostRestrictionMenuComponent({
  title,
  description
}: PostRestrictionMenuComponentProps) {
  const { isOpen, close } = usePostRestrictionMenuContext()
  const { onAction } = usePostRestrictionSubmit()

  return (
    <PostRestrictionMenu.Root isOpen={isOpen} close={close}>
      <PostRestrictionMenu.Content>
        <PostRestrictionMenu.Header title={title} description={description} />
        <RestrictionForm.Form>
          <RestrictionForm.Input.Name require />
          <RestrictionForm.Input.Code require />
          <RestrictionForm.Input.ColorPicker
            name="color"
            label="Cor da restrição"
            require
          />
        </RestrictionForm.Form>

        <PostRestrictionMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <RestrictionForm.Submit<RestrictionEntity>
            onSubmit={(data: RestrictionEntity) => onAction(data, close)}
          />
        </PostRestrictionMenu.Footer>
      </PostRestrictionMenu.Content>
    </PostRestrictionMenu.Root>
  )
}
