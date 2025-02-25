import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
	useAsTitle: 'email',
  },
  fields: [
	{
	  name: 'name',
	  type: 'text',
	  label: 'Imię i nazwisko',
	},
	{
	  name: 'role',
	  type: 'select',
	  options: [
		{
		  label: 'Admin',
		  value: 'admin',
		},
		{
		  label: 'Editor',
		  value: 'editor',
		},
	  ],
	  defaultValue: 'editor',
	  required: true,
	},
  ],
}