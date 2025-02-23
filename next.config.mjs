// next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	/*
	experimental: {
		reactCompiler: false,
	},
	*/
	images: {
		domains: ['localhost', 'makerspace.silesia.pl', 'warsztatmiejski.org'],
	},
	transpilePackages: ['payload'],
	webpack: (config) => {
		config.resolve.alias = {
			...config.resolve.alias,
			'@payload-config': './payload.config.ts'
		}
		return config
	}
};

export default withPayload(nextConfig);