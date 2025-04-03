import { CollectionConfig } from 'payload/types';

export const ThemeSettings: CollectionConfig = {
  slug: 'theme-settings',
  labels: {
    singular: {
      en: 'Theme Settings',
      pl: 'Ustawienia motywu',
    },
    plural: {
      en: 'Theme Settings',
      pl: 'Ustawienia motywu',
    },
  },
  admin: {
    group: {
      en: 'Settings',
      pl: 'Ustawienia',
    },
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
          admin: {
            description: 'Logo główne - używane w panelu administracyjnym',
          }
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Ikona - używana jako favicon i mniejsza wersja logo',
          }
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Favicon (jeśli inny niż ikona)',
          }
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Obraz OpenGraph - wyświetlany w mediach społecznościowych',
          }
        },
        {
          name: 'adminTitle',
          type: 'text',
          admin: {
            description: 'Tytuł panelu administracyjnego',
          },
          defaultValue: 'Warsztat Miejski Admin',
        },
        {
          name: 'adminWelcomeTitle',
          type: 'text',
          admin: {
            description: 'Tytuł powitania w panelu administracyjnym',
          },
          defaultValue: 'Witaj w panelu administracyjnym',
        },
        {
          name: 'adminWelcomeText',
          type: 'textarea',
          admin: {
            description: 'Tekst powitania w panelu administracyjnym',
          },
          defaultValue: 'Tutaj możesz zarządzać treścią strony, wydarzeniami i członkami społeczności.',
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
      name: 'admin',
      type: 'group',
      admin: {
        description: 'Ustawienia panelu administracyjnego'
      },
      fields: [
        {
          name: 'useWhiteLabel',
          type: 'checkbox',
          admin: {
            description: 'Użyj systemu white label, bez brandingu Warsztatu Miejskiego',
          }
        },
        {
          name: 'orgName',
          type: 'text',
          admin: {
            description: 'Nazwa organizacji',
            condition: (_, siblingData) => siblingData?.useWhiteLabel,
          },
          defaultValue: 'Warsztat Miejski',
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