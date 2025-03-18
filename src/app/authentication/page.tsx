import { AuthenticationCard } from '@/modules/authentication/presentation/components/authentication-card'
import { AuthenticationForm } from '@/modules/authentication/presentation/components/authentication-form'
import { AuthenticationFormCard } from '@/modules/authentication/presentation/components/authentication-form-card'
import { ThemeLogoComponent } from '@/modules/shared/presentation/components/theme-logo/theme-logo.component'
import { MESSAGES_AUTHENTICATION } from '@/modules/shared/presentation/messages/authentication'
import { MESSAGES_HELP_ME } from '@/modules/shared/presentation/messages/help-me'

interface Images {
  bannerImageSrc: string
  bannerImageAlt: string
  lightLogoSrc: string
  lightLogoAlt: string
  darkLogoSrc: string
  darkLogoAlt: string
  mobileLightLogoSrc: string
  mobileLightLogoAlt: string
  mobileDarkLogoSrc: string
  mobileDarkLogoAlt: string
}

interface Data {
  title: string
  description: string
  copyright: string
  helpMeUsername: string
  helpMePassword: string
  helpMeForgotPassword: string
  images: Images
}

const data: Data = {
  title: MESSAGES_AUTHENTICATION['1.1'],
  description: MESSAGES_AUTHENTICATION['1.2'],
  copyright: MESSAGES_AUTHENTICATION['1.6'],
  helpMeUsername: MESSAGES_HELP_ME['username'],
  helpMePassword: MESSAGES_HELP_ME['password'],
  helpMeForgotPassword: MESSAGES_HELP_ME['forgotPassword'],
  images: {
    bannerImageSrc: '/backgrounds/authentication_roads.jpg',
    lightLogoSrc: '/logos/gtots_principal_hor_margem.svg',
    darkLogoSrc: '/logos/gtots_preto_hor_margem.svg',
    mobileLightLogoSrc: '/logos/gtots_principal_hor.svg',
    mobileDarkLogoSrc: '/logos/gtots_branco_hor.svg',

    bannerImageAlt: 'Imagem de uma estrada ao amanhecer',
    lightLogoAlt: 'Logotipo claro da GTOTS',
    darkLogoAlt: 'Logotipo escuro da GTOTS',
    mobileLightLogoAlt: 'Logotipo claro da GTOTS para dispositivos móveis',
    mobileDarkLogoAlt: 'Logotipo escuro da GTOTS para dispositivos móveis'
  }
}

export default function AuthenticationPage() {
  return (
    <AuthenticationCard.Root copyright={data.copyright}>
      <AuthenticationCard.Banner
        src={data.images.bannerImageSrc}
        alt={data.images.bannerImageAlt}
      >
        <ThemeLogoComponent
          className="absolute z-50 bottom-4 left-4 h-[70px] bg-white"
          logoLightSrc={data.images.lightLogoSrc}
          logoLightAlt={data.images.lightLogoAlt}
          logoDarkSrc={data.images.darkLogoSrc}
          logoDarkAlt={data.images.darkLogoAlt}
        />
      </AuthenticationCard.Banner>

      <AuthenticationCard.Content>
        <AuthenticationForm.Root>
          <AuthenticationFormCard.Root>
            <AuthenticationFormCard.Header>
              <ThemeLogoComponent
                isMobileOnly={true}
                className="h-[50px] mb-2"
                logoLightSrc={data.images.mobileLightLogoSrc}
                logoLightAlt={data.images.mobileLightLogoAlt}
                logoDarkSrc={data.images.mobileDarkLogoSrc}
                logoDarkAlt={data.images.mobileDarkLogoAlt}
              />
              <AuthenticationFormCard.Title title={data.title} />
              <AuthenticationFormCard.Description
                description={data.description}
              />
            </AuthenticationFormCard.Header>

            <AuthenticationFormCard.Content>
              <AuthenticationForm.InputUsername
                description={data.helpMeUsername}
              />
              <AuthenticationForm.InputPassword
                description={data.helpMePassword}
              >
                <AuthenticationForm.ForgotPassword
                  description={data.helpMeForgotPassword}
                />
              </AuthenticationForm.InputPassword>
            </AuthenticationFormCard.Content>

            <AuthenticationFormCard.Footer>
              <AuthenticationForm.InputSubmit />
            </AuthenticationFormCard.Footer>
          </AuthenticationFormCard.Root>
        </AuthenticationForm.Root>
      </AuthenticationCard.Content>
    </AuthenticationCard.Root>
  )
}
