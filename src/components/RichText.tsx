'use client'

import React from 'react'

type RichTextProps = {
  content?: any
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  if (!content) {
    return null
  }

  // Check if content is a string or has a root.cachedHTML
  const htmlContent = typeof content === 'string' 
    ? content
    : content?.root?.cachedHTML || '';

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}