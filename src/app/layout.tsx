import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/modules/shared/presentation/styles/globals.css'
import { ThemeProvider } from '@/modules/shared/presentation/components/shadcn/theme-provider'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/modules/shared/presentation/components/shadcn/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SIGMA',
  description:
    'O SIGMA (Sistema Integrado de Gestão, Medição e Avaliação) é uma plataforma web para recepção, gerenciamento e processamento de dados produzidos pelos equipamentos de campo.',
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white sm:bg-muted dark:bg-zinc-950`}
      >
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
