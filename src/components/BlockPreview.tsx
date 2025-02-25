import React from 'react';
import { Hero } from '@/components/blocks/Hero';
import { Content } from '@/components/blocks/Content';
import { Features } from '@/components/blocks/Features';
import { CTA } from '@/components/blocks/CTA';

const components = {
  hero: Hero,
  content: Content,
  features: Features,
  cta: CTA,
};

export const BlockPreview: React.FC<{
  blockType: string;
  data: any;
}> = ({ blockType, data }) => {
  const Component = components[blockType];

  if (!Component) {
	return (
	  <div className="p-4 border border-gray-200 rounded">
		<div className="text-sm text-gray-500">
		  Podgląd niedostępny dla tego typu bloku
		</div>
	  </div>
	);
  }

  return (
	<div className="border border-gray-200 rounded overflow-hidden">
	  <div className="bg-gray-50 px-4 py-2 text-sm text-gray-500 border-b">
		Podgląd bloku
	  </div>
	  <div className="scale-50 origin-top">
		<Component {...data} />
	  </div>
	</div>
  );
};