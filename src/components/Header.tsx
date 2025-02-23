// src/components/Header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // We'll replace this with dynamic data from Payload later
  const menuItems = [
	{ label: 'Strona główna', link: '/' },
	{ label: 'O nas', link: '/o-nas' },
	{ label: 'Co robimy', link: '/co-robimy' },
	{ label: 'Wydarzenia', link: '/wydarzenia' },
	{ label: 'Kontakt', link: '/kontakt' },
  ]

  return (
	<header className="bg-white shadow">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div className="flex justify-between h-20">
		  <div className="flex-shrink-0 flex items-center">
			<Link href="/">
			  {/* Replace with your actual logo */}
			  <div className="h-12 w-auto relative">
				<div className="font-bold text-xl">Warsztat Miejski</div>
				{/* Uncomment when you have a logo */}
				{/* <Image
				  src="/logo.svg"
				  alt="Warsztat Miejski Logo"
				  fill
				  className="object-contain"
				  priority
				/> */}
			  </div>
			</Link>
		  </div>

		  {/* Desktop menu */}
		  <nav className="hidden md:ml-6 md:flex md:space-x-8">
			{menuItems.map((item) => (
			  <Link
				key={item.link}
				href={item.link}
				className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
			  >
				{item.label}
			  </Link>
			))}
			<Link
			  href="/dolacz"
			  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
			>
			  Dołącz do nas
			</Link>
		  </nav>

		  {/* Mobile menu button */}
		  <div className="flex items-center md:hidden">
			<button
			  type="button"
			  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
			  aria-expanded="false"
			  onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
			  <span className="sr-only">Otwórz menu</span>
			  {/* Icon when menu is closed */}
			  <svg
				className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			  >
				<path
				  strokeLinecap="round"
				  strokeLinejoin="round"
				  strokeWidth={2}
				  d="M4 6h16M4 12h16M4 18h16"
				/>
			  </svg>
			  {/* Icon when menu is open */}
			  <svg
				className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				aria-hidden="true"
			  >
				<path
				  strokeLinecap="round"
				  strokeLinejoin="round"
				  strokeWidth={2}
				  d="M6 18L18 6M6 6l12 12"
				/>
			  </svg>
			</button>
		  </div>
		</div>
	  </div>

	  {/* Mobile menu, show/hide based on menu state */}
	  <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
		<div className="pt-2 pb-3 space-y-1">
		  {menuItems.map((item) => (
			<Link
			  key={item.link}
			  href={item.link}
			  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
			  onClick={() => setIsMenuOpen(false)}
			>
			  {item.label}
			</Link>
		  ))}
		  <Link
			href="/dolacz"
			className="block pl-3 pr-4 py-2 text-base font-medium text-blue-600 hover:bg-gray-50"
			onClick={() => setIsMenuOpen(false)}
		  >
			Dołącz do nas
		  </Link>
		</div>
	  </div>
	</header>
  )
}

export default Header