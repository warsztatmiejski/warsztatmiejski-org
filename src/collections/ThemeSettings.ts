import { CollectionConfig } from 'payload/types';

export const ThemeSettings: CollectionConfig = {
  slug: 'theme-settings',
  admin: {
	group: 'Ustawienia',
	useAsTitle: 'name',
  },
  access: {
	read: () => true,
  },
  fields: [
	{
	  name: 'name',
	  type: 'text',
	  required: true,
	  defaultValue: 'Ustawienia motywu',
	  admin: {
		readOnly: true,
	  }
	},
	{
	  name: 'branding',
	  type: 'group',
	  fields: [
		{
		  name: 'logo',
		  type: 'upload',
		  relationTo: 'media',
		  required: true,
		},
		{
		  name: 'favicon',
		  type: 'upload',
		  relationTo: 'media',
		}
	  ]
	},
	{
	  name: 'colors',
	  type: 'group',
	  fields: [
		{
		  name: 'primary',
		  type: 'text',
		  required: true,
		  defaultValue: '#0066CC',
		  admin: {
			description: 'Kolor podstawowy (format hex)',
		  }
		},
		{
		  name: 'secondary',
		  type: 'text',
		  required: true,
		  defaultValue: '#003366',
		  admin: {
			description: 'Kolor dodatkowy (format hex)',
		  }
		},
		{
		  name: 'accent',
		  type: 'text',
		  defaultValue: '#FF9900',
		  admin: {
			description: 'Kolor akcentujący (format hex)',
		  }
		}
	  ]
	},
	{
	  name: 'typography',
	  type: 'group',
	  fields: [
		{
		  name: 'headingFont',
		  type: 'select',
		  options: [
			{ label: 'Inter', value: 'inter' },
			{ label: 'Roboto', value: 'roboto' },
			{ label: 'Open Sans', value: 'open-sans' },
		  ],
		  defaultValue: 'inter',
		  required: true,
		},
		{
		  name: 'bodyFont',
		  type: 'select',
		  options: [
			{ label: 'Inter', value: 'inter' },
			{ label: 'Roboto', value: 'roboto' },
			{ label: 'Open Sans', value: 'open-sans' },
		  ],
		  defaultValue: 'inter',
		  required: true,
		}
	  ]
	},
	{
	  name: 'customCSS',
	  type: 'code',
	  admin: {
		language: 'css',
		description: 'Dodatkowy kod CSS',
	  }
	}
  ]
};