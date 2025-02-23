// src/collections/Users.ts
import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true, // Enable authentication
  admin: {
	useAsTitle: 'email',
	group: 'Admin',
  },
  access: {
	// Only admins can read users
	read: ({ req }) => {
	  return req.user?.role === 'admin';
	},
	// Only admins can create users
	create: ({ req }) => {
	  return req.user?.role === 'admin';
	},
  },
  fields: [
	// Email and password are added automatically because auth: true
	{
	  name: 'firstName',
	  type: 'text',
	},
	{
	  name: 'lastName',
	  type: 'text',
	},
	{
	  name: 'role',
	  type: 'select',
	  defaultValue: 'editor',
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
	  required: true,
	},
  ],
};