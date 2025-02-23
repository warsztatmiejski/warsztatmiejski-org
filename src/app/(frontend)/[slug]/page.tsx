// src/app/(frontend)/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Image from 'next/image'
import getPayloadClient from '../../(payload)/_payload'
import { RichText } from '@/components/RichText'

// Generate static params
export async function generateStaticParams() {
  const payload = await getPayloadClient()

  const pages = await payload.find({
	collection: 'pages',
	limit: 100,
	where: {
	  status: {
		equals: 'published',
	  },
	},
  })

  return pages.docs.map((page) => ({
	slug: page.slug,
  }))
}

// Metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const payload = await getPayloadClient()

  const pages = await payload.find({
	collection: 'pages',
	where: {
	  slug: {
		equals: params.slug,
	  },
	},
  })

  if (!pages.docs[0]) {
	return {
	  title: 'Page Not Found',
	}
  }

  const page = pages.docs[0]

  return {
	title: page.meta?.title || page.title,
	description: page.meta?.description,
  }
}

// Page component
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const payload = await getPayloadClient()

  // Fetch the page by slug
  const pagesQuery = await payload.find({
	collection: 'pages',
	where: {
	  slug: {
		equals: slug,
	  },
	  status: {
		equals: 'published',
	  },
	},
  })

  // If no page is found, return 404
  if (!pagesQuery.docs[0]) {
	notFound()
  }

  const page = pagesQuery.docs[0]

  return (
	<div className="max-w-4xl mx-auto py-8">
	  <header className="mb-8">
		<h1 className="text-4xl font-bold mb-4">{page.title}</h1>

		{page.featuredImage && (
		  <div className="relative h-64 w-full mb-6">
			<Image
			  src={page.featuredImage.url}
			  alt={page.featuredImage.alt || page.title}
			  fill
			  className="object-cover rounded-lg"
			/>
		  </div>
		)}
	  </header>

	  <div className="prose prose-lg max-w-none">
		<RichText content={page.content} />
	  </div>
	</div>
  )
}