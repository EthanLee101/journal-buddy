import React from 'react'
import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { Navigation } from '@/components/layout/Navigation'

export const metadata: Metadata = {
  title: 'JournalBuddy - Your Mental Health Companion',
  description: 'A private, AI-powered journaling app for better mental health',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-cool-50 to-cool-100">
        <SessionProvider>
          <QueryProvider>
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
} 