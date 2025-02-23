// src/components/RichText.tsx
'use client'

import React from 'react'
import { useLexicalNodeSelection } from '@payloadcms/richtext-lexical'

interface RichTextProps {
  content: any
}

export const RichText: React.FC<RichTextProps> = ({ content }) => {
  // Initialize the Lexical serializer
  const selection = useLexicalNodeSelection()

  if (!content) {
	return null
  }

  // For simplicity, we're just returning dangerouslySetInnerHTML here
  // In a production environment, you'd want to properly serialize the Lexical content
  // Using the provided Lexical serializers
  return (
	<div
	  className="rich-text"
	  dangerouslySetInnerHTML={{ __html: content }}
	/>
  )
}

export default RichText