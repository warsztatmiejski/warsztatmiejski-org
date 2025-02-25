// src/app/(frontend)/[slug]/page.tsx
import { notFound } from 'next/navigation'
import getPayloadClient from '../../(payload)/_payload'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import React, { Fragment } from 'react'

// Import your block components
import { Hero } from '@/components/blocks/Hero'
import { Content } from '@/components/blocks/Content'
import { Features } from '@/components/blocks/Features'
import { CTA } from '@/components/blocks/CTA'

const blockComponents = {
  hero: Hero,
  content: Content,
  features: Features,
  cta: CTA,
}

interface PageParams {
  params: {
	slug: string
  }
}

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
export async function generateMetadata({ params }: PageParams) {
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
	  title: 'Strona nie znaleziona',
	}
  }

  const page = pages.docs[0]

  return {
	title: page.meta?.title || page.title,
	description: page.meta?.description,
  }
}

export default async function DynamicPage({ params }: PageParams) {
  // Use the slug directly - it's already a string in this route
  const slug = params.slug
  const payload = await getPayloadClient()

  // Update to include draft: true for live preview
  const pages = await payload.find({
	collection: 'pages',
	where: {
	  slug: {
		equals: slug,
	  },
	},
	draft: true, // Enable draft mode for live preview
  })

  if (!pages.docs[0]) {
	notFound()
  }

  const page = pages.docs[0]

  return (
	<Fragment>
	  <RefreshRouteOnSave />
	  <div>
		{page.layout?.map((block, i) => {
		  const Component = blockComponents[block.blockType]
		  if (!Component) return null
		  return <Component key={i} {...block} />
		})}
	  </div>
	</Fragment>
  )
}