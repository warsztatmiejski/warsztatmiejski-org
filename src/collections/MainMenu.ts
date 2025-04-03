// src/collections/MainMenu.ts
import { CollectionConfig } from 'payload/types';

export const MainMenu: CollectionConfig = {
  slug: 'main-menu',
  labels: {
    singular: {
      en: 'Main Menu',
      pl: 'Menu',
    },
    plural: {
      en: 'Main Menus',
      pl: 'Menu',
    },
  },
  access: {
	// Anyone can read the menu
	read: () => true,
	// Only authenticated users can update
	update: ({ req: { user } }) => Boolean(user),
	create: ({ req: { user } }) => Boolean(user),
	delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
	useAsTitle: 'title',
	group: {
	  en: 'Settings',
	  pl: 'Ustawienia',
	},
  },
  fields: [
	{
	  name: 'title',
	  type: 'text',
	  required: true,
	  localized: true,
	},
	{
	  name: 'items',
	  type: 'array',
	  required: true,
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
		  name: 'type',
		  type: 'select',
		  options: [
			{
			  label: 'Internal Page',
			  value: 'internal',
			},
			{
			  label: 'External URL',
			  value: 'external',
			},
		  ],
		  defaultValue: 'internal',
		  required: true,
		},
		{
		  name: 'page',
		  type: 'relationship',
		  relationTo: 'pages',
		  required: true,
		  admin: {
			condition: (data, siblingData) => siblingData?.type === 'internal',
		  },
		},
		{
		  name: 'externalLink',
		  type: 'text',
		  admin: {
			condition: (data, siblingData) => siblingData?.type === 'external',
		  },
		},
		{
		  name: 'openInNewTab',
		  type: 'checkbox',
		  label: 'Open in new tab',
		  defaultValue: false,
		},
		{
		  name: 'subItems',
		  type: 'array',
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
			  name: 'type',
			  type: 'select',
			  options: [
				{
				  label: 'Internal Page',
				  value: 'internal',
				},
				{
				  label: 'External URL',
				  value: 'external',
				},
			  ],
			  defaultValue: 'internal',
			  required: true,
			},
			{
			  name: 'page',
			  type: 'relationship',
			  relationTo: 'pages',
			  required: true,
			  admin: {
				condition: (data, siblingData) => siblingData?.type === 'internal',
			  },
			},
			{
			  name: 'externalLink',
			  type: 'text',
			  admin: {
				condition: (data, siblingData) => siblingData?.type === 'external',
			  },
			},
			{
			  name: 'openInNewTab',
			  type: 'checkbox',
			  label: 'Open in new tab',
			  defaultValue: false,
			},
		  ],
		},
	  ],
	},
  ],
};