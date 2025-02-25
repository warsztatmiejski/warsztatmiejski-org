// src/app/(frontend)/page.tsx
import { notFound } from 'next/navigation'
import getPayloadClient from '../(payload)/_payload'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import React, { Fragment } from 'react'

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

export default async function Home() {
  const payload = await getPayloadClient()

  // Fetch homepage (check both '/' and empty string)
  const pages = await payload.find({
	collection: 'pages',
	where: {
	  or: [
		{
		  slug: {
			equals: '/'
		  }
		},
		{
		  slug: {
			equals: ''
		  }
		}
	  ]
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