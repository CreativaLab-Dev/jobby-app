import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CV Score',
  description: 'Cv Score potenciado con inteligencia artificial'
}

export default async function RootLayout({
    children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
