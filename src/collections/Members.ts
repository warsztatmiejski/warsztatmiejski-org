// src/collections/Members.ts
import { CollectionConfig } from 'payload/types';

export const Members: CollectionConfig = {
  slug: 'members',
  labels: {
    singular: {
      en: 'Member',
      pl: 'Członek',
    },
    plural: {
      en: 'Members',
      pl: 'Członkowie',
    },
  },
  auth: true, // Enable authentication for members
  admin: {
	useAsTitle: 'email',
	defaultColumns: ['email', 'firstName', 'lastName', 'membershipStatus'],
	group: {
	  en: 'Main',
	  pl: 'Główne',
	},
  },
  access: {
	read: () => true,
  },
  fields: [
	{
	  name: 'firstName',
	  type: 'text',
	  required: true,
	},
	{
	  name: 'lastName',
	  type: 'text',
	  required: true,
	},
	{
	  name: 'phone',
	  type: 'text',
	  admin: {
		description: 'Phone number with country code',
	  },
	},
	{
	  name: 'membershipStatus',
	  type: 'select',
	  options: [
		{
		  label: 'Active',
		  value: 'active',
		},
		{
		  label: 'Pending',
		  value: 'pending',
		},
		{
		  label: 'Expired',
		  value: 'expired',
		},
		{
		  label: 'Cancelled',
		  value: 'cancelled',
		},
	  ],
	  defaultValue: 'pending',
	  required: true,
	  admin: {
		position: 'sidebar',
	  },
	},
	{
	  name: 'membershipType',
	  type: 'select',
	  options: [
		{
		  label: 'Regular',
		  value: 'regular',
		},
		{
		  label: 'Student',
		  value: 'student',
		},
		{
		  label: 'Supporter',
		  value: 'supporter',
		},
		{
		  label: 'Honorary',
		  value: 'honorary',
		},
	  ],
	  defaultValue: 'regular',
	  required: true,
	},
	{
	  name: 'memberSince',
	  type: 'date',
	  admin: {
		date: {
		  pickerAppearance: 'dayOnly',
		},
	  },
	},
	{
	  name: 'membershipExpiresAt',
	  type: 'date',
	  admin: {
		date: {
		  pickerAppearance: 'dayOnly',
		},
	  },
	},
	{
	  name: 'skills',
	  type: 'array',
	  fields: [
		{
		  name: 'skill',
		  type: 'text',
		  required: true,
		},
		{
		  name: 'level',
		  type: 'select',
		  options: [
			{
			  label: 'Beginner',
			  value: 'beginner',
			},
			{
			  label: 'Intermediate',
			  value: 'intermediate',
			},
			{
			  label: 'Advanced',
			  value: 'advanced',
			},
			{
			  label: 'Expert',
			  value: 'expert',
			},
		  ],
		  required: true,
		},
	  ],
	},
	{
	  name: 'notes',
	  type: 'textarea',
	  admin: {
		description: 'Admin notes about this member',
	  },
	},
	// Payment history
	{
	  name: 'payments',
	  type: 'array',
	  admin: {
		readOnly: true,
	  },
	  fields: [
		{
		  name: 'date',
		  type: 'date',
		  required: true,
		},
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
		{
		  name: 'type',
		  type: 'select',
		  options: [
			{
			  label: 'Membership Fee',
			  value: 'membershipFee',
			},
			{
			  label: 'Event Registration',
			  value: 'event',
			},
			{
			  label: 'Donation',
			  value: 'donation',
			},
			{
			  label: 'Other',
			  value: 'other',
			},
		  ],
		  required: true,
		},
		{
		  name: 'event',
		  type: 'relationship',
		  relationTo: 'events',
		  admin: {
			condition: (data, siblingData) => siblingData?.type === 'event',
		  },
		},
		{
		  name: 'notes',
		  type: 'text',
		},
	  ],
	},
  ],
};