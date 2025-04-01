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
  featuredImage?: {
	url: string;
	alt: string;
	width: number;
	height: number;
  };
  summary: string;
  startDate: string;
  location: string;
  isPaid: boolean;
  price?: {
	amount: number;
	currency: string;
  };
  status: 'published' | 'draft' | 'soldOut' | 'cancelled' | 'completed';
};

export const EventCard: React.FC<EventCardProps> = ({
  title,
  slug,
  featuredImage,
  summary,
  startDate,
  location,
  isPaid,
  price,
  status,
}) => {
  // Format date to Polish locale
  const formattedDate = format(new Date(startDate), 'PPP', { locale: pl });
  const formattedTime = format(new Date(startDate), 'HH:mm');

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
	  {featuredImage ? (
		<div className="relative h-48 w-full">
		  <Image
			src={featuredImage.url}
			alt={featuredImage.alt || title}
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
			{isPaid ? `${price?.amount} ${price?.currency}` : 'Bezpłatne'}
		  </span>
		</div>

		<h3 className="text-xl font-bold mb-2">{title}</h3>
		<p className="text-sm text-gray-500 mb-2">{location}</p>
		<p className="text-gray-700 mb-4 line-clamp-3">{summary}</p>

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