import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/modules/shared/presentation/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SIGMA',
  description:
    'O SIGMA (Sistema Integrado de Gestão, Medição e Avaliação) é uma plataforma web para recepção, gerenciamento e processamento de dados produzidos pelos equipamentos de campo.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} dark:bg-background`}>
        {children}
      </body>
    </html>
  )
}
