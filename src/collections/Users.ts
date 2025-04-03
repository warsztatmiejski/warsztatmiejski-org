import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      pl: 'Użytkownik',
    },
    plural: {
      en: 'Users',
      pl: 'Użytkownicy',
    },
  },
  auth: true,
  admin: {
	useAsTitle: 'email',
	group: {
	  en: 'System',
	  pl: 'System',
	},
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