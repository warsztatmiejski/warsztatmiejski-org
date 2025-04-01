import sharp from 'sharp'
import path from 'path'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { pl } from '@payloadcms/translations/languages/pl'
import { en } from '@payloadcms/translations/languages/en'

// Import collections
import { Users } from '@/collections/Users'
import { Pages } from '@/collections/Pages'
import { Media } from '@/collections/Media'
import { MainMenu } from '@/collections/MainMenu'
import { ThemeSettings } from '@/collections/ThemeSettings'
import { Events } from '@/collections/Events'
import { Members } from '@/collections/Members'

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  secret: process.env.PAYLOAD_SECRET,

  admin: {
	user: Users.slug,
	meta: {
	  titleSuffix: `- ${process.env.NEXT_PUBLIC_ADMIN_TITLE || 'Warsztat Miejski Admin'}`,
	  favicon: '/favicon.ico',
	  ogImage: '/admin-og-image.jpg',
	},
	//
	components: {
	  // Dashboard view
	  views: {
		Dashboard: {
		  Component: 'src/admin/components/Dashboard',
		},
	  },
	  // Components before and after dashboard
	  beforeDashboard: ['src/admin/components/DashboardBanner'],
	  afterNavLinks: ['src/admin/components/CustomNavLinks'],
	  // Theme provider
	  providers: [
		'src/admin/providers/AdminThemeProvider',
	  ],
	  // Graphics for white labeling - use paths instead of imports
	  graphics: {
		Logo: 'src/admin/components/Login',
		Icon: 'src/admin/graphics/Icon',
	  },
	},
	// Customowy CSS
	css: path.resolve(__dirname, 'src/app/(payload)/custom.scss'),
	//
	// Grupowanie kolekcji w menu
	groupNav: {
	  'Główne': ['pages', 'events', 'members'],
	  'Ustawienia': ['theme-settings', 'main-menu'],
	  'System': ['media', 'users'],
	},
	livePreview: {
	  breakpoints: [
		{
		  name: 'mobile',
		  width: 375,
		  height: 667,
		  label: 'Mobilny',
		},
		{
		  name: 'tablet',
		  width: 768,
		  height: 1024,
		  label: 'Tablet',
		},
		{
		  name: 'desktop',
		  width: 1440,
		  height: 900,
		  label: 'Desktop',
		},
	  ],
	},
  },

  editor: lexicalEditor({}),

  db: postgresAdapter({
	pool: {
	  connectionString: process.env.DATABASE_URI,
	},
  }),

  collections: [
	Users,
	Pages,
	Media,
	MainMenu,
	ThemeSettings,
	Events,
	Members,
  ],

  i18n: {
	supportedLanguages: { pl, en },
	defaultLanguage: 'pl', // Ustawienie polskiego jako domyślny język
	fallbackLanguage: 'en',
  },

  typescript: {
	outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  sharp,

  // Dostosowanie limitów uploadu
  upload: {
	limits: {
	  fileSize: 5000000, // 5MB
	},
  }
})