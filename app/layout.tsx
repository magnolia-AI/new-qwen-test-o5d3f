import './globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from '@/components/theme-provider'
import { SocialProvider } from '@/contexts/social-context'

export const metadata: Metadata = {
  title: 'Social Media App',
  description: 'A social media application built with Next.js and Tailwind CSS',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full flex flex-col antialiased">
        <SocialProvider>
          <ThemeProvider defaultTheme="light" attribute="class">
            <main className="flex-1">
              {children}
            </main>
            <Toaster />
          </ThemeProvider>
        </SocialProvider>
      </body>
    </html>
  )
}
