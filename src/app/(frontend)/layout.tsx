// src/app/(frontend)/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../globals.css'

// Load the Inter font
const inter = Inter({ subsets: ['latin', 'latin-ext'] })

export const metadata: Metadata = {
  title: 'Warsztat Miejski - Makerspace w Gliwicach',
  description: 'Warsztat Miejski to organizacja non-profit prowadząca makerspace w Gliwicach.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
	<html lang="pl">
	  <body className={inter.className}>
		<Header />
		<main className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		  {children}
		</main>
		<Footer />
	  </body>
	</html>
  )
}