'use client'

import * as React from 'react'
import { Copy, Check } from 'lucide-react'
import { useColorPicker } from '../../hooks/use-color-picker.hook'
import { useColorPickerUI } from '../../hooks/use-color-picker-ui.hook'

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from '@/modules/shared/presentation/components/shadcn/tabs'
import { Input } from '@/modules/shared/presentation/components/shadcn/input'
import { Button } from '@/modules/shared/presentation/components/shadcn/button'

interface Props {
  value?: string
  onChange?: (value: string) => void
}

export function ColorPicker({ value, onChange }: Props) {
  const {
    hsl,
    rgb,
    colorPlaneRef,
    startPlaneDrag,
    startHueDrag,
    handleHue
  } = useColorPicker({ value, onChange })

  const {
    mode,
    setMode,
    copied,
    hexInput,
    rgbInput,
    hslInput,
    rgba,
    hsla,
    isEditingRef,
    copy,
    handleHex,
    handleRgb,
    handleHsl
  } = useColorPickerUI({
    value,
    rgb,
    hsl,
    onChange
  })

  return (
    <div className="grid gap-4">
      <div
        ref={colorPlaneRef}
        className="relative w-full h-48 rounded-lg cursor-crosshair"
        style={{
          background: `
            linear-gradient(180deg,#fff 0%,transparent 50%,#000 100%),
            radial-gradient(ellipse at 100% 50%,hsl(${hsl.h},100%,50%) 0%,transparent 100%)
          `
        }}
        onMouseDown={startPlaneDrag}
        onTouchStart={startPlaneDrag}
      >
        <div
          className="absolute w-4 h-4 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${hsl.s}%`,
            top: `${100 - hsl.l}%`,
            backgroundColor: value
          }}
        />
      </div>

      <div
        className="relative h-2 rounded-sm cursor-pointer"
        style={{
          background: `linear-gradient(to right,
            hsl(0,100%,50%),
            hsl(60,100%,50%),
            hsl(120,100%,50%),
            hsl(180,100%,50%),
            hsl(240,100%,50%),
            hsl(300,100%,50%),
            hsl(360,100%,50%)
          )`
        }}
        onMouseDown={startHueDrag}
        onClick={(e) => handleHue(e.clientX, e.currentTarget)}
      >
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-white"
          style={{
            left: `${(hsl.h / 360) * 100}%`,
            backgroundColor: `hsl(${hsl.h},100%,50%)`
          }}
        />
      </div>

      <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
        <TabsList className="w-full">
          <TabsTrigger value="hex" className="flex-1">Hex</TabsTrigger>
          <TabsTrigger value="rgba" className="flex-1">RGBA</TabsTrigger>
          <TabsTrigger value="hsla" className="flex-1">HSLA</TabsTrigger>
        </TabsList>

        <TabsContent value="hex">
          <div className="flex gap-2">
            <Input
              value={hexInput}
              onFocus={() => (isEditingRef.current = true)}
              onBlur={() => (isEditingRef.current = false)}
              onChange={(e) => handleHex(e.target.value)}
            />
            <Button size="icon" variant="ghost" onClick={() => copy(value, 'hex')}>
              {copied.hex ? <Check /> : <Copy />}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="rgba">
          <div className="grid gap-3">
            <div className="flex gap-2">
              <Input value={rgba} readOnly />
              <Button size="icon" variant="ghost" onClick={() => copy(rgba, 'rgba')}>
                {copied.rgba ? <Check /> : <Copy />}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Input
                value={rgbInput.r}
                onFocus={() => (isEditingRef.current = true)}
                onBlur={() => (isEditingRef.current = false)}
                onChange={(e) => handleRgb('r', e.target.value)}
              />
              <Input
                value={rgbInput.g}
                onFocus={() => (isEditingRef.current = true)}
                onBlur={() => (isEditingRef.current = false)}
                onChange={(e) => handleRgb('g', e.target.value)}
              />
              <Input
                value={rgbInput.b}
                onFocus={() => (isEditingRef.current = true)}
                onBlur={() => (isEditingRef.current = false)}
                onChange={(e) => handleRgb('b', e.target.value)}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hsla">
          <div className="grid gap-3">
            <div className="flex gap-2">
              <Input value={hsla} readOnly />
              <Button size="icon" variant="ghost" onClick={() => copy(hsla, 'hsla')}>
                {copied.hsla ? <Check /> : <Copy />}
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Input
                value={hslInput.h}
                onFocus={() => (isEditingRef.current = true)}
                onBlur={() => (isEditingRef.current = false)}
                onChange={(e) => handleHsl('h', e.target.value)}
              />
              <Input
                value={hslInput.s}
                onFocus={() => (isEditingRef.current = true)}
                onBlur={() => (isEditingRef.current = false)}
                onChange={(e) => handleHsl('s', e.target.value)}
              />
              <Input
                value={hslInput.l}
                onFocus={() => (isEditingRef.current = true)}
                onBlur={() => (isEditingRef.current = false)}
                onChange={(e) => handleHsl('l', e.target.value)}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="h-6 rounded border" style={{ backgroundColor: value }} />
    </div>
  )
}