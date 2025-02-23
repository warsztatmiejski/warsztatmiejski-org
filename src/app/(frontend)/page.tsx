// src/app/(frontend)/page.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
	<div>
	  {/* Hero Section */}
	  <section className="relative overflow-hidden">
		{/* Hero background - replace with an actual image */}
		<div className="absolute inset-0 bg-gray-200">
		  {/* Uncomment when you have a hero image */}
		  {/* <Image
			src="/images/hero.jpg"
			alt="Warsztat Miejski space"
			fill
			className="object-cover"
			priority
		  /> */}
		  <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
		</div>

		<div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
		  <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
			Warsztat Miejski
		  </h1>
		  <p className="mt-6 max-w-3xl text-xl text-gray-200">
			Miejsce do tworzenia, naprawiania i dzielenia się wiedzą. Dołącz do naszej społeczności!
		  </p>
		  <div className="mt-10 flex space-x-4">
			<Link
			  href="/wydarzenia"
			  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
			  Nadchodzące wydarzenia
			</Link>
			<Link
			  href="/dolacz"
			  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
			  Dołącz do nas
			</Link>
		  </div>
		</div>
	  </section>

	  {/* About Section */}
	  <section className="py-16 bg-white">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <div className="text-center">
			<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
			  Czym jest Warsztat Miejski?
			</h2>
			<p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
			  Wspólna przestrzeń do realizacji projektów i rozwijania umiejętności.
			</p>
		  </div>

		  <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
			<div className="bg-gray-50 p-6 rounded-lg">
			  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
				</svg>
			  </div>
			  <div className="mt-4">
				<h3 className="text-lg font-medium text-gray-900">Społeczność</h3>
				<p className="mt-2 text-base text-gray-500">
				  Miejsce spotkań osób o różnych zainteresowaniach i umiejętnościach, które dzielą się wiedzą i doświadczeniem.
				</p>
			  </div>
			</div>

			<div className="bg-gray-50 p-6 rounded-lg">
			  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
				</svg>
			  </div>
			  <div className="mt-4">
				<h3 className="text-lg font-medium text-gray-900">Narzędzia i maszyny</h3>
				<p className="mt-2 text-base text-gray-500">
				  Dostęp do profesjonalnych narzędzi, drukarek 3D, elektroniki oraz przestrzeni warsztatowej.
				</p>
			  </div>
			</div>

			<div className="bg-gray-50 p-6 rounded-lg">
			  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path d="M12 14l9-5-9-5-9 5 9 5z" />
				  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
				  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
				</svg>
			  </div>
			  <div className="mt-4">
				<h3 className="text-lg font-medium text-gray-900">Warsztaty i szkolenia</h3>
				<p className="mt-2 text-base text-gray-500">
				  Regularne warsztaty, szkolenia i spotkania dla początkujących i zaawansowanych twórców.
				</p>
			  </div>
			</div>
		  </div>
		</div>
	  </section>

	  {/* Featured Events Section */}
	  <section className="py-16 bg-gray-50">
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		  <div className="text-center">
			<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
			  Nadchodzące wydarzenia
			</h2>
			<p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
			  Dołącz do jednego z naszych wydarzeń i poznaj społeczność Warsztatu Miejskiego.
			</p>
		  </div>

		  <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{/* Example Event Cards - Replace with dynamic content later */}
			{[1, 2, 3].map((item) => (
			  <div key={item} className="bg-white overflow-hidden shadow rounded-lg">
				<div className="h-48 bg-gray-200">
				  {/* Event image placeholder */}
				</div>
				<div className="px-4 py-5 sm:p-6">
				  <div className="text-sm text-gray-500 mb-1">15 maja 2025, 18:00</div>
				  <h3 className="text-lg font-medium text-gray-900 mb-2">Warsztat z Arduino</h3>
				  <p className="text-gray-500 mb-4">
					Naucz się podstaw programowania mikrokontrolerów Arduino i zbuduj swój pierwszy projekt.
				  </p>
				  <Link
					href="/wydarzenia/warsztat-arduino"
					className="text-blue-600 hover:text-blue-800 font-medium"
				  >
					Dowiedz się więcej →
				  </Link>
				</div>
			  </div>
			))}
		  </div>

		  <div className="text-center mt-12">
			<Link
			  href="/wydarzenia"
			  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
			>
			  Zobacz wszystkie wydarzenia
			</Link>
		  </div>
		</div>
	  </section>

	  {/* Call to Action */}
	  <section className="bg-blue-700">
		<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
		  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
			<span className="block">Gotowy do dołączenia?</span>
			<span className="block text-blue-200">Zostań członkiem Warsztatu Miejskiego już dziś.</span>
		  </h2>
		  <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
			<div className="inline-flex rounded-md shadow">
			  <Link
				href="/dolacz"
				className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
			  >
				Dołącz do nas
			  </Link>
			</div>
			<div className="ml-3 inline-flex rounded-md shadow">
			  <Link
				href="/kontakt"
				className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
			  >
				Kontakt
			  </Link>
			</div>
		  </div>
		</div>
	  </section>
	</div>
  )
}