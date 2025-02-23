// src/collections/Events.ts
import { CollectionConfig } from 'payload/types';
import { lexicalRichTextField } from '@payloadcms/richtext-lexical';

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
	useAsTitle: 'title',
	defaultColumns: ['title', 'startDate', 'endDate', 'isPaid', 'status'],
  },
  access: {
	read: () => true, // Public read access
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
	  name: 'featuredImage',
	  type: 'upload',
	  relationTo: 'media',
	  admin: {
		description: 'Featured image for the event',
		position: 'sidebar',
	  },
	},
	{
	  name: 'summary',
	  type: 'textarea',
	  required: true,
	  localized: true,
	},
	{
	  name: 'content',
	  type: 'richText',
	  required: true,
	  localized: true,
	},
	{
	  name: 'startDate',
	  type: 'date',
	  required: true,
	  admin: {
		date: {
		  pickerAppearance: 'dayAndTime',
		  timeFormat: '24hr',
		},
	  },
	},
	{
	  name: 'endDate',
	  type: 'date',
	  required: true,
	  admin: {
		date: {
		  pickerAppearance: 'dayAndTime',
		  timeFormat: '24hr',
		},
	  },
	},
	{
	  name: 'location',
	  type: 'text',
	  required: true,
	  localized: true,
	},
	{
	  name: 'isPaid',
	  type: 'checkbox',
	  label: 'This is a paid event',
	  defaultValue: false,
	},
	{
	  name: 'price',
	  type: 'group',
	  admin: {
		condition: (data) => Boolean(data?.isPaid),
	  },
	  fields: [
		{
		  name: 'amount',
		  type: 'number',
		  required: true,
		},
		{
		  name: 'currency',
		  type: 'select',
		  options: [
			{
			  label: 'PLN',
			  value: 'PLN',
			},
			{
			  label: 'EUR',
			  value: 'EUR',
			},
		  ],
		  defaultValue: 'PLN',
		  required: true,
		},
	  ],
	},
	{
	  name: 'capacity',
	  type: 'number',
	  required: true,
	  defaultValue: 20,
	  admin: {
		description: 'Maximum number of attendees',
	  },
	},
	{
	  name: 'registrations',
	  type: 'array',
	  admin: {
		readOnly: true,
	  },
	  fields: [
		{
		  name: 'member',
		  type: 'relationship',
		  relationTo: 'members',
		  required: true,
		},
		{
		  name: 'registeredAt',
		  type: 'date',
		  admin: {
			readOnly: true,
		  },
		},
		{
		  name: 'paid',
		  type: 'checkbox',
		  defaultValue: false,
		},
		{
		  name: 'attended',
		  type: 'checkbox',
		  defaultValue: false,
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
		{
		  label: 'Sold Out',
		  value: 'soldOut',
		},
		{
		  label: 'Cancelled',
		  value: 'cancelled',
		},
		{
		  label: 'Completed',
		  value: 'completed',
		},
	  ],
	  defaultValue: 'draft',
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