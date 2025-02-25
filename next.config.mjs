// next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
	domains: ['localhost', 'makerspace.silesia.pl', 'warsztatmiejski.org'],
  },
  // Add this as part of nextConfig, not as a separate argument
  env: {
	PAYLOAD_SECRET: process.env.PAYLOAD_SECRET
  }
};

export default withPayload(nextConfig);