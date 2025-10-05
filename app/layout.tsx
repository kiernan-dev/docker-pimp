import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const basePath = process.env.NODE_ENV === 'production' ? '/dockerpimp' : '';

export const metadata: Metadata = {
  title: 'Docker Pimp | Your Ultimate Docker Commands Companion',
  description: 'Docker Pimp - The most stylish and comprehensive Docker commands cheat sheet with search, favorites, and copy-to-clipboard functionality. Pimp your Docker workflow!',
  keywords: ['docker', 'docker pimp', 'cheat sheet', 'terminal', 'commands', 'containers', 'kubernetes', 'devops'],
  authors: [{ name: 'Kiernan' }],
  icons: {
    icon: `${basePath}/favicon.png`,
    shortcut: `${basePath}/favicon.png`,
    apple: `${basePath}/favicon.png`,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        {/* Animated Gradient Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 animate-gradient" />
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-100/70 via-blue-100/50 to-indigo-100/70 dark:from-purple-900/30 dark:via-pink-900/20 dark:to-blue-900/30 animate-gradient-reverse" />
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-100/30 via-purple-100/20 to-indigo-100/30 dark:opacity-0" />
        </div>

        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}