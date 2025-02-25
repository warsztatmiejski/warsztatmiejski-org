'use client'

import React from 'react'

type RichTextProps = {
  content: any
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  if (!content) {
	return null
  }

  return (
	<div
	  className="prose prose-lg max-w-none"
	  dangerouslySetInnerHTML={{ __html: content?.root?.cachedHTML || content }}
	/>
  )
}