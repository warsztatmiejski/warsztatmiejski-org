import sharp from 'sharp'
import path from 'path'

import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import { pl } from '@payloadcms/translations/languages/pl'
import { en } from '@payloadcms/translations/languages/en'

// Import collections
import { Users } from './src/collections/Users'
import { Pages } from './src/collections/Pages'
import { Media } from './src/collections/Media'
import { MainMenu } from './src/collections/MainMenu'
import { ThemeSettings } from './src/collections/ThemeSettings'
import { Events } from './src/collections/Events'
import { Members } from './src/collections/Members'

export default buildConfig({
	serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
	secret: process.env.PAYLOAD_SECRET,

	admin: {
		user: Users.slug,
		meta: {
			titleSuffix: '- Warsztat Miejski Admin',
			favicon: '/favicon.ico',
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
		fallbackLanguage: 'en',
	},

	typescript: {
		outputFile: path.resolve(__dirname, 'payload-types.ts'),
	},

	sharp,
})