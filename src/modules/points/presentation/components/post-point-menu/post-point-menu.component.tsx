'use client'

import { Button } from '@/modules/shared/presentation/components/shadcn/button'
import { PostPointMenu } from '.'
import { PointForm } from '../point-form'
import type { PointEntity } from '@/modules/points/domain/entities/point.entity'
import { usePostPointSubmit } from '../../hooks/use-post-point-submit.hook'
import { usePostPointMenuContext } from '../../contexts/post-point-menu.context'

interface PostPointMenuComponentProps {
  title: string
  description: string
}

export function PostPointMenuComponent({
  title,
  description
}: PostPointMenuComponentProps) {
  const { isOpen, close } = usePostPointMenuContext()
  const { onAction } = usePostPointSubmit()

  return (
    <PostPointMenu.Root isOpen={isOpen} close={close}>
      <PostPointMenu.Content>
        <PostPointMenu.Header title={title} description={description} />
        <PointForm.Form>
          <PointForm.Input.Name require />
          <PointForm.Input.Description />
          <PointForm.Input.cfg />
        </PointForm.Form>

        <PostPointMenu.Footer>
          <Button
            className="w-full sm:w-[150px]"
            variant="outline"
            onClick={close}
          >
            Cancelar
          </Button>
          <PointForm.Submit<PointEntity>
            onSubmit={(point: PointEntity) => onAction(point, close)}
          />
        </PostPointMenu.Footer>
      </PostPointMenu.Content>
    </PostPointMenu.Root>
  )
}
