import { DeauthenticationButton } from '@/modules/system/presentation/components/deauthentication/deauthentication-button.component'

export default function SystemPage() {
  return (
    <main className="flex flex-col gap-y-9 justify-center items-center h-svh w-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-black dark:text-zinc-50 text-5xl text-center font-semibold">
          Pagina Autenticada
        </h1>
        <p className="text-black/50 dark:text-zinc-50/50 max-w-2xl text-center">
          Esta seção de teste confirma que o usuário está autenticado. Seu login
          foi reconhecido com sucesso, permitindo o acesso às funcionalidades
          restritas da aplicação.
        </p>
      </div>

      <DeauthenticationButton />
    </main>
  )
}
