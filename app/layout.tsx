import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ColonyProvider } from '@/context/ColonyContext'
import '@/styles/globals.css'

const poppins = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Mi Colonia Participa | Plataforma de Participación Ciudadana',
  description: 'Plataforma integral para la gestión democrática de colonias. Elecciones, convocatorias, deliberación y seguimiento de acuerdos.',
  icons: [
    { rel: 'icon', url: '/imagenes/logoCropped.png' },
  ],
  keywords: ['participación ciudadana', 'colonias', 'elecciones', 'deliberación', 'democracia'],
  authors: [{ name: 'Tu Colonia', url: 'https://tucolonia.com' }],
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://tucolonia.com',
    siteName: 'Mi Colonia Participa',
    title: 'Mi Colonia Participa',
    description: 'Plataforma de participación ciudadana para colonias',
    images: [
      {
        url: 'https://tucolonia.com/imagenes/logoCropped.png',
        width: 1200,
        height: 630,
        alt: 'Mi Colonia Participa',
      },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffc000" />
      </head>
      <body className={poppins.className}>
        <ColonyProvider>
          <Header />
          <main className="container mx-auto px-4 py-8 mt-28 min-h-screen">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            theme="light"
            richColors
            closeButton
          />
        </ColonyProvider>
      </body>
    </html>
  )
}



