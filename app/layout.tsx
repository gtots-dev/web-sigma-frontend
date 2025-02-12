export const metadata = {
  title: 'Sigma Frontend',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="container">
          {children}
        </main>
      </body>
    </html>
  )
}