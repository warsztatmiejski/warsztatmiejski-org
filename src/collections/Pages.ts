// src/collections/Pages.ts
import { CollectionConfig } from 'payload/types';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
	useAsTitle: 'title',
	defaultColumns: ['title', 'slug', 'status', 'updatedAt'],
	group: 'Content',
  },
  access: {
	// Anyone can read published pages
	read: ({ doc }) => {
	  if (doc?.status === 'published') return true;
	  // Otherwise, only authenticated users can read
	  return ({ req: { user } }) => Boolean(user);
	},
	// Only authenticated users can create or update
	update: ({ req: { user } }) => Boolean(user),
	create: ({ req: { user } }) => Boolean(user),
	delete: ({ req: { user } }) => Boolean(user),
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
		position: 'sidebar',
	  },
	},
	{
	  name: 'content',
	  type: 'richText',
	  required: true,
	  localized: true,
	},
	{
	  name: 'featuredImage',
	  type: 'upload',
	  relationTo: 'media',
	  admin: {
		description: 'Featured image for this page',
		position: 'sidebar',
	  },
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
  ],
};