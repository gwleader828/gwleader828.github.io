import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-heading",
  display: 'swap',
})

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'PixelTools - Powerful Developer Tools Platform',
  description: 'Discover and use powerful developer tools to streamline your workflow. From code formatters to API testers, we have everything you need.',
  keywords: ['developer tools', 'productivity', 'code tools', 'API tools', 'web development'],
  authors: [{ name: 'PixelTools' }],
  creator: 'PixelTools',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pixeltools.dev',
    title: 'PixelTools - Powerful Developer Tools Platform',
    description: 'Discover and use powerful developer tools to streamline your workflow.',
    siteName: 'PixelTools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelTools - Powerful Developer Tools Platform',
    description: 'Discover and use powerful developer tools to streamline your workflow.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CookieConsent />
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
