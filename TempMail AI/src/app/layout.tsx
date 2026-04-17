import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'TempMail AI — Instant Disposable Email',
  description: 'Generate secure, anonymous temporary email addresses instantly. No registration required. Protect your privacy with TempMail AI.',
  keywords: 'temporary email, disposable email, fake email, anonymous email, temp mail, privacy email',
  openGraph: {
    title: 'TempMail AI — Instant Disposable Email',
    description: 'Generate secure, anonymous temporary email addresses instantly.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-bg text-gray-900 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
