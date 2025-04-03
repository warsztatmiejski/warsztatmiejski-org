// src/collections/Media.ts
import { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: {
      en: 'Media',
      pl: 'Medium',
    },
    plural: {
      en: 'Media',
      pl: 'Media',
    },
  },
  access: {
	// Anyone can view media
	read: () => true,
	// Only authenticated users can upload
	create: ({ req: { user } }) => Boolean(user),
	update: ({ req: { user } }) => Boolean(user),
	delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
	useAsTitle: 'filename',
	group: {
	  en: 'System',
	  pl: 'System',
	},
  },
  upload: {
	// Store files in the /public/media directory for easy access
	staticDir: '../public/media',
	// Make files accessible through the /media route
	staticURL: '/media',
	// Configure image resizing
	imageSizes: [
	  {
		name: 'thumbnail',
		width: 400,
		height: 300,
		position: 'centre',
	  },
	  {
		name: 'card',
		width: 768,
		height: 512,
		position: 'centre',
	  },
	  {
		name: 'tablet',
		width: 1024,
		height: null,
		position: 'centre',
	  },
	],
	// Allow these MIME types
	mimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml', 'image/webp'],
  },
  fields: [
	{
	  name: 'alt',
	  type: 'text',
	  label: 'Alt Text',
	  localized: true,
	},
	{
	  name: 'caption',
	  type: 'text',
	  label: 'Caption',
	  localized: true,
	},
  ],
};