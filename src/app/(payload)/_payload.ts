// src/app/(payload)/_payload.ts
import { getPayload } from 'payload/dist/payload'
import config from '../../../payload.config'

// This singleton ensures that Payload is only instantiated once
let payload

// Singleton function that retrieves or instantiates Payload
export default async function getPayloadClient() {
  if (payload) return payload

  // Check if the Payload secret is set
  if (!process.env.PAYLOAD_SECRET) {
	throw new Error('PAYLOAD_SECRET environment variable is missing')
  }

  // Initialize Payload
  payload = await getPayload({
	// Pass in the config object
	config,
	// Configure Payload to work with Next.js
	options: {
	  local: true,
	},
  })

  return payload
}