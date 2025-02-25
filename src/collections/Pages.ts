import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
	useAsTitle: 'title',
	defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
	group: 'Content',
	// Poprawiona konfiguracja Live Preview
	livePreview: {
	  url: ({ data }) => {
		// Home page has empty or '/' slug
		if (!data?.slug || data.slug === '/' || data.slug === '') {
		  return `${process.env.NEXT_PUBLIC_SERVER_URL}/`
		}
		// For other pages - upewnij się, że adres URL jest poprawny
		return `${process.env.NEXT_PUBLIC_SERVER_URL}/${data.slug}`
	  },
	},
  },
  access: {
	read: () => true,
  },
  fields: [
	{
	  name: 'title',
	  type: 'text',
	  required: true,
	  localized: true,
	},
	{
	  name: 'slug',
	  type: 'text',
	  required: true,
	  unique: true,
	  admin: {
		description: 'Pozostaw puste dla strony głównej',
	  },
	},
	{
	  name: 'layout',
	  type: 'blocks',
	  required: true,
	  blocks: [
		// Hero section
		{
		  slug: 'hero',
		  label: 'Hero',
		  fields: [
			{
			  name: 'heading',
			  type: 'text',
			  required: true,
			  localized: true,
			},
			{
			  name: 'subheading',
			  type: 'textarea',
			  localized: true,
			},
			{
			  name: 'image',
			  type: 'upload',
			  relationTo: 'media',
			},
			{
			  name: 'buttons',
			  type: 'array',
			  maxRows: 2,
			  fields: [
				{
				  name: 'label',
				  type: 'text',
				  required: true,
				  localized: true,
				},
				{
				  name: 'link',
				  type: 'text',
				  required: true,
				},
				{
				  name: 'style',
				  type: 'select',
				  options: [
					{ label: 'Primary', value: 'primary' },
					{ label: 'Secondary', value: 'secondary' },
				  ],
				  defaultValue: 'primary',
				},
			  ],
			},
		  ],
		},
		// Content section
		{
		  slug: 'content',
		  label: 'Content',
		  fields: [
			{
			  name: 'content',
			  type: 'richText',
			  required: true,
			  localized: true,
			  editor: lexicalEditor({}),
			},
		  ],
		},
		// Features grid
		{
		  slug: 'features',
		  label: 'Features',
		  fields: [
			{
			  name: 'heading',
			  type: 'text',
			  localized: true,
			},
			{
			  name: 'features',
			  type: 'array',
			  minRows: 1,
			  maxRows: 6,
			  fields: [
				{
				  name: 'title',
				  type: 'text',
				  required: true,
				  localized: true,
				},
				{
				  name: 'description',
				  type: 'textarea',
				  localized: true,
				},
				{
				  name: 'icon',
				  type: 'select',
				  options: [
					{ label: 'Community', value: 'users' },
					{ label: 'Tools', value: 'tools' },
					{ label: 'Education', value: 'education' },
				  ],
				},
			  ],
			},
		  ],
		},
		// Call to action
		{
		  slug: 'cta',
		  label: 'Call to Action',
		  fields: [
			{
			  name: 'heading',
			  type: 'text',
			  required: true,
			  localized: true,
			},
			{
			  name: 'subheading',
			  type: 'textarea',
			  localized: true,
			},
			{
			  name: 'button',
			  type: 'group',
			  fields: [
				{
				  name: 'label',
				  type: 'text',
				  required: true,
				  localized: true,
				},
				{
				  name: 'link',
				  type: 'text',
				  required: true,
				},
			  ],
			},
			{
			  name: 'backgroundColor',
			  type: 'select',
			  options: [
				{ label: 'Blue', value: 'blue' },
				{ label: 'Gray', value: 'gray' },
				{ label: 'White', value: 'white' },
			  ],
			  defaultValue: 'blue',
			},
		  ],
		},
	  ],
	},
	{
	  name: 'meta',
	  type: 'group',
	  fields: [
		{
		  name: 'title',
		  type: 'text',
		  label: 'Meta Title',
		  localized: true,
		},
		{
		  name: 'description',
		  type: 'textarea',
		  label: 'Meta Description',
		  localized: true,
		},
	  ],
	},
	{
	  name: 'status',
	  type: 'select',
	  options: [
		{
		  label: 'Draft',
		  value: 'draft',
		},
		{
		  label: 'Published',
		  value: 'published',
		},
	  ],
	  defaultValue: 'draft',
	  required: true,
	  admin: {
		position: 'sidebar',
	  },
	},
  ],
  versions: {
	drafts: {
	  autosave: true,
	},
  },
}