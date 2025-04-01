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
  try {
    const payload = await getPayloadClient()
    
    if (!payload) {
      console.error('Payload client is undefined in generateStaticParams')
      return []
    }

    const pages = await payload.find({
      collection: 'pages',
      limit: 100,
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    if (!pages?.docs) {
      console.error('No pages found in generateStaticParams')
      return []
    }

    return pages.docs.map((page) => ({
      slug: page.slug || '',
    }))
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}

// Metadata for the page
export async function generateMetadata({ params }: PageParams) {
  try {
    const payload = await getPayloadClient()
    
    if (!payload) {
      console.error('Payload client is undefined in generateMetadata')
      return {
        title: 'Error',
      }
    }

    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: params.slug,
        },
      },
    })

    if (!pages?.docs || pages.docs.length === 0) {
      return {
        title: 'Strona nie znaleziona',
      }
    }

    const page = pages.docs[0]

    return {
      title: page.meta?.title || page.title || 'Page',
      description: page.meta?.description || '',
    }
  } catch (error) {
    console.error('Error in generateMetadata:', error)
    return {
      title: 'Error',
    }
  }
}

export default async function DynamicPage({ params }: PageParams) {
  try {
    // Use the slug directly - it's already a string in this route
    const slug = params.slug
    const payload = await getPayloadClient()
    
    if (!payload) {
      console.error('Payload client is undefined')
      return <div>Error loading content. Please try again later.</div>
    }

    // Update to include draft: true for live preview
    const pagesResponse = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      draft: true, // Enable draft mode for live preview
    })

    if (!pagesResponse?.docs || pagesResponse.docs.length === 0) {
      console.error('Page not found:', slug)
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
    console.error('Error in DynamicPage:', error)
    return <div>Error loading content. Please try again later.</div>
  }
}