// payload.config.ts
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

// Import collections (we'll create these next)
import { Users } from '@/collections/Users';
import { Pages } from '@/collections/Pages';
import { Media } from '@/collections/Media';
import { MainMenu } from '@/collections/MainMenu';

export default buildConfig({
  // The server URL - used for generating admin panel URLs
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // Admin panel configuration
  admin: {
	user: 'users', // Reference to the collection used for authentication
	meta: {
	  titleSuffix: '- Warsztat Miejski',
	  favicon: '/favicon.ico',
	},
  },

  // PostgreSQL database connection
  db: postgresAdapter({
	pool: {
	  connectionString: process.env.DATABASE_URI,
	},
  }),

  // Configure collections (content types)
  collections: [
	Users, // Admin users
	Pages, // Regular content pages
	Media, // Uploaded media
	MainMenu, // Navigation menus
  ],

  // Rich text editor configuration
  editor: lexicalEditor({}),

  // TypeScript configuration - generate types for your collections
  typescript: {
	outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  // Localization - Polish and English support
  localization: {
	locales: ['pl', 'en'],
	defaultLocale: 'pl',
	fallback: true,
  },

  // Security
  secret: process.env.PAYLOAD_SECRET || 'your-secret-key-here',

  // For image processing
  upload: {
	limits: {
	  fileSize: 10000000, // 10MB
	},
  },
});