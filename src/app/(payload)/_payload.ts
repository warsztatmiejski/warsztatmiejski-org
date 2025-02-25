// src/app/(payload)/_payload.ts
import { getPayload } from 'payload'
import type { Payload } from 'payload'
import config from '../../../payload.config'

// Global singleton
let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = {
	client: null,
	promise: null,
  }
}

export default async function getPayloadClient(): Promise<Payload> {
  // Debug environment variables
  console.log('Debug env vars:')
  console.log('- PAYLOAD_SECRET exists:', !!process.env.PAYLOAD_SECRET)
  console.log('- NODE_ENV:', process.env.NODE_ENV)
  console.log('- SERVER_URL:', process.env.NEXT_PUBLIC_SERVER_URL)

  if (!process.env.PAYLOAD_SECRET) {
	throw new Error('PAYLOAD_SECRET environment variable is missing')
  }

  if (cached.client) {
	return cached.client
  }

  if (!cached.promise) {
	try {
	  cached.promise = getPayload({
		config,
		options: {
		  local: true,
		  secret: process.env.PAYLOAD_SECRET, // Try explicitly passing it here
		},
	  })
	} catch (error) {
	  console.error('Error initializing Payload:', error)
	  throw error
	}
  }

  try {
	cached.client = await cached.promise
  } catch (e) {
	cached.promise = null
	throw e
  }

  return cached.client
}