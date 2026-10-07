import { ModalShellHeader as HeaderComponent } from './modal-shell-header.component'
import { ModalShellFooter as FooterComponent } from './modal-shell-footer.component'
import { ModalShellLoading as LoadingComponent } from './modal-shell-loading.component'
import { ModalShellEmpty as EmptyComponent } from './modal-shell-empty.component'
import { ModalShellBody as BodyComponent } from './modal-shell-body.component'
import { ModalShellRoot as RootComponent } from './modal-shell-root.component'
import { ModalShellContent as ContentComponent } from './modal-shell-content.component'

export const ModalShell = {
  Shell: {
    Root: RootComponent,
    Header: HeaderComponent,
    Content: ContentComponent,
    Footer: FooterComponent
  },
  Root: RootComponent,
  Header: HeaderComponent,
  Content: ContentComponent,
  Footer: FooterComponent,
  Loading: LoadingComponent,
  Empty: EmptyComponent,
  Body: BodyComponent
}
