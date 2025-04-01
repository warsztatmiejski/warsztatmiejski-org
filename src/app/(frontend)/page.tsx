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
  try {
    const payload = await getPayloadClient()
    
    if (!payload) {
      console.error('Payload client is undefined')
      return <div>Error loading content. Please try again later.</div>
    }

    // Fetch homepage (check both '/' and empty string)
    const pagesResponse = await payload.find({
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

    // Verify we have docs and at least one page
    if (!pagesResponse?.docs || pagesResponse.docs.length === 0) {
      console.error('No homepage found')
      notFound()
    }

    const page = pagesResponse.docs[0]

    return (
	  <Fragment>
	    <RefreshRouteOnSave />
	    <div>
		  {page?.layout && Array.isArray(page.layout) ? (
		    page.layout.map((block, i) => {
		      if (!block || !block.blockType) return null
		      const Component = blockComponents[block.blockType]
		      if (!Component) return null
		      return <Component key={i} {...block} />
		    })
		  ) : (
		    <div>No content blocks found</div>
		  )}
	    </div>
	  </Fragment>
    )
  } catch (error) {
    console.error('Error in Home page:', error)
    return <div>Error loading content. Please try again later.</div>
  }
}