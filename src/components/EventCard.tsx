// src/components/EventCard.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

type EventCardProps = {
  title: string;
  slug: string;
  featured_image?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  meta?: {
    description?: string;
  };
  event_date?: string;
  start_date?: string; // For backwards compatibility
  location: string;
  is_paid: boolean;
  price_amount?: number;
  price_currency?: string;
  status: 'published' | 'draft' | 'soldOut' | 'cancelled' | 'completed';
  is_repeating?: 'not_repeating' | 'repeating';
};

export const EventCard: React.FC<EventCardProps> = ({
  title,
  slug,
  featured_image,
  meta,
  event_date,
  start_date, // For backwards compatibility
  location,
  is_paid,
  price_amount,
  price_currency,
  status,
  is_repeating,
}) => {
  // Use event_date if available, otherwise fallback to start_date for backwards compatibility
  const dateToUse = event_date || start_date;
  
  // Format date to Polish locale, with error handling
  let formattedDate = '';
  let formattedTime = '';
  try {
    if (dateToUse) {
      formattedDate = format(new Date(dateToUse), 'PPP', { locale: pl });
      formattedTime = format(new Date(dateToUse), 'HH:mm');
    }
  } catch (error) {
    console.error('Error formatting date:', error);
  }

  const statusBadgeColor = {
    published: 'bg-green-100 text-green-800',
    draft: 'bg-gray-100 text-gray-800',
    soldOut: 'bg-red-100 text-red-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
  };

  const statusLabel = {
    published: 'Zapisz się',
    draft: 'Wkrótce',
    soldOut: 'Wyprzedane',
    cancelled: 'Odwołane',
    completed: 'Zakończone',
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {featured_image ? (
        <div className="relative h-48 w-full">
          <Image
            src={featured_image.url}
            alt={featured_image.alt || title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Brak zdjęcia</span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="text-sm text-gray-600 mr-4">
            {formattedDate} {formattedTime}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${statusBadgeColor[status]}`}>
            {is_paid ? `${price_amount} ${price_currency}` : 'Bezpłatne'}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-2">
          {is_repeating === 'repeating' && (
            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs mr-2">
              Wydarzenie cykliczne
            </span>
          )}
          {location && <span>{location}</span>}
        </p>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {meta?.description || 'Brak opisu'}
        </p>

        <div className="flex justify-between items-center">
          <Link
            href={`/events/${slug}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Więcej informacji →
          </Link>

          <button
            className={`px-4 py-2 rounded-md ${
              status === 'published'
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-600 cursor-not-allowed'
            }`}
            disabled={status !== 'published'}
          >
            {statusLabel[status]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;