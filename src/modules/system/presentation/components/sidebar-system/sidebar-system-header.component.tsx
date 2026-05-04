import { SidebarHeader } from '@/modules/shared/presentation/components/shadcn/sidebar'
import { ThemeLogoComponent } from '@/modules/shared/presentation/components/theme-logo/theme-logo.component'
import { ThemeToggle } from '@/modules/shared/presentation/components/theme-toggle/theme-toggle.component'
import lightLogoSrc from '@/../public/logos/gtots_principal_hor.svg'
import darkLogoSrc from '@/../public/logos/gtots_branco_hor.svg'

export function SidebarSystemHeaderComponent() {
  const images = {
    lightLogoSrc: lightLogoSrc,
    darkLogoSrc: darkLogoSrc,
    lightLogoAlt: 'Logotipo claro da GTOTS',
    darkLogoAlt: 'Logotipo escuro da GTOTS'
  }

  return (
    <SidebarHeader className="flex flex-row justify-between h-16 p-3 border-b shrink-0 items-center">
      <ThemeLogoComponent
        height={36}
        width={87}
        logoLightSrc={images.lightLogoSrc}
        logoLightAlt={images.lightLogoAlt}
        logoDarkSrc={images.darkLogoSrc}
        logoDarkAlt={images.darkLogoAlt}
      />
      <ThemeToggle />
    </SidebarHeader>
  )
}
