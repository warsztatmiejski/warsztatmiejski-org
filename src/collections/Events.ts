// src/collections/Events.ts
import { CollectionConfig } from 'payload/types';
import { formatSlug } from '../utilities/formatSlug';

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: {
      en: 'Event',
      pl: 'Wydarzenie',
    },
    plural: {
      en: 'Events',
      pl: 'Wydarzenia',
    },
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'event_date', 'location', 'is_repeating', 'status'],
    group: {
      en: 'Main',
      pl: 'Główne',
    },
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Event title - will be used to generate the URL slug',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly version of the title (auto-generated)',
      },
      hooks: {
        beforeValidate: [
          formatSlug('title'),
        ],
      },
    },
    {
      name: 'featured_image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Featured image for the event',
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    
    // Basic event details
    {
      name: 'event_date',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Event date (first occurrence for repeating events)',
        width: '50%',
      },
    },
    {
      name: 'event_time',
      type: 'text',
      required: true,
      admin: {
        description: 'Start time (HH:MM)',
        placeholder: '18:00',
        width: '50%',
      },
      validate: (value) => {
        if (!value) return true;
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(value)) {
          return 'Please enter a valid time in 24-hour format (HH:MM)';
        }
        return true;
      },
    },
    {
      name: 'event_duration',
      type: 'number',
      required: true,
      min: 15,
      defaultValue: 120,
      admin: {
        description: 'Duration in minutes',
      },
    },
    
    // Recurrence options
    {
      name: 'is_repeating',
      type: 'select',
      options: [
        {
          label: 'Not repeating',
          value: 'not_repeating',
        },
        {
          label: 'Repeating',
          value: 'repeating',
        }
      ],
      required: true,
      defaultValue: 'not_repeating',
      admin: {
        description: 'Is this a repeating event?',
      },
      hooks: {
        beforeChange: [
          ({ value }) => {
            // Store in event_type field for compatibility with database
            return value;
          }
        ]
      }
    },
    {
      name: 'event_type', // Hidden field to store is_repeating value for DB compatibility
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ operation, originalDoc, data }) => {
            return data.is_repeating;
          }
        ]
      }
    },
    {
      name: 'repeat_interval',
      type: 'number',
      required: false,
      defaultValue: 1,
      min: 1,
      admin: {
        description: 'Repeat every X...',
        condition: (data) => data?.is_repeating === 'repeating',
        width: '33%',
      },
    },
    {
      name: 'repeat_unit',
      type: 'select',
      options: [
        {
          label: 'Days',
          value: 'days',
        },
        {
          label: 'Weeks',
          value: 'weeks',
        },
        {
          label: 'Months',
          value: 'months',
        },
        {
          label: 'Years',
          value: 'years',
        },
      ],
      defaultValue: 'weeks',
      admin: {
        condition: (data) => data?.is_repeating === 'repeating',
        width: '67%',
      },
    },
    {
      name: 'repeat_on_days',
      type: 'select',
      hasMany: true,
      admin: {
        description: 'On these days of the week (for weekly recurrence)',
        condition: (data) => data?.is_repeating === 'repeating' && data?.repeat_unit === 'weeks',
      },
      options: [
        {
          label: 'Monday',
          value: 'monday',
        },
        {
          label: 'Tuesday',
          value: 'tuesday',
        },
        {
          label: 'Wednesday',
          value: 'wednesday',
        },
        {
          label: 'Thursday',
          value: 'thursday',
        },
        {
          label: 'Friday',
          value: 'friday',
        },
        {
          label: 'Saturday',
          value: 'saturday',
        },
        {
          label: 'Sunday',
          value: 'sunday',
        },
      ],
    },
    {
      name: 'repeat_end_type',
      type: 'select',
      options: [
        {
          label: 'Never',
          value: 'never',
        },
        {
          label: 'On date',
          value: 'date',
        },
        {
          label: 'After occurrences',
          value: 'occurrences',
        },
      ],
      defaultValue: 'occurrences',
      admin: {
        condition: (data) => data?.is_repeating === 'repeating',
      },
    },
    {
      name: 'repeat_end_date',
      type: 'date',
      admin: {
        condition: (data) => data?.is_repeating === 'repeating' && data?.repeat_end_type === 'date',
        description: 'Last occurrence date',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'repeat_occurrences',
      type: 'number',
      min: 2,
      defaultValue: 4,
      admin: {
        condition: (data) => data?.is_repeating === 'repeating' && data?.repeat_end_type === 'occurrences',
        description: 'Number of occurrences',
      },
    },
    
    // Store legacy database fields
    {
      name: 'start_date',
      type: 'date',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            return data.event_date;
          }
        ]
      }
    },
    {
      name: 'end_date',
      type: 'date',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            if (data.is_repeating === 'not_repeating') {
              return data.event_date;
            }
            
            if (data.repeat_end_type === 'date' && data.repeat_end_date) {
              return data.repeat_end_date;
            }
            
            if (data.repeat_end_type === 'never') {
              // For endless recurrence, set an end date 1 year in the future
              const startDate = new Date(data.event_date);
              if (!startDate) return null;
              const endDate = new Date(startDate);
              endDate.setFullYear(endDate.getFullYear() + 1);
              return endDate;
            }
            
            // Calculate end date based on occurrences
            const startDate = new Date(data.event_date);
            if (!startDate) return null;
            
            const occurrences = data.repeat_occurrences || 1;
            const interval = data.repeat_interval || 1;
            const unit = data.repeat_unit || 'weeks';
            
            const endDate = new Date(startDate);
            
            switch (unit) {
              case 'days':
                endDate.setDate(endDate.getDate() + (occurrences - 1) * interval);
                break;
              case 'weeks':
                endDate.setDate(endDate.getDate() + (occurrences - 1) * interval * 7);
                break;
              case 'months':
                endDate.setMonth(endDate.getMonth() + (occurrences - 1) * interval);
                break;
              case 'years':
                endDate.setFullYear(endDate.getFullYear() + (occurrences - 1) * interval);
                break;
            }
            
            return endDate;
          }
        ]
      }
    },
    
    // Event details
    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'is_paid',
      type: 'checkbox',
      label: 'This is a paid event',
      defaultValue: false,
    },
    {
      name: 'price_amount',
      type: 'number',
      admin: {
        condition: (data) => Boolean(data?.is_paid),
        width: '50%',
      },
    },
    {
      name: 'price_currency',
      type: 'select',
      options: [
        {
          label: 'PLN',
          value: 'PLN',
        },
        {
          label: 'EUR',
          value: 'EUR',
        },
      ],
      defaultValue: 'PLN',
      admin: {
        condition: (data) => Boolean(data?.is_paid),
        width: '50%',
      },
    },
    {
      name: 'capacity',
      type: 'number',
      required: true,
      defaultValue: 20,
      admin: {
        description: 'Maximum number of attendees',
      },
    },
    {
      name: 'registrations',
      type: 'array',
      admin: {
        readOnly: true,
      },
      fields: [
        {
          name: 'member',
          type: 'relationship',
          relationTo: 'members',
          required: true,
        },
        {
          name: 'registeredAt',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'paid',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'attended',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
        {
          label: 'Sold Out',
          value: 'soldOut',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
      ],
      defaultValue: 'draft',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Meta Title',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Meta Description',
          localized: true,
        },
      ],
    },
  ],
};