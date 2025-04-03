import { Field } from 'payload/types';

type Args = {
  overrideSlug?: string;
  data: Record<string, unknown>;
  originalDoc?: {
    slug?: string;
    [key: string]: unknown;
  }
}

// Utility to generate slugs from field values
export const formatSlug = (fieldToUse: string) => ({ 
  overrideSlug, data, originalDoc,
}: Args): string => {
  // If there's an override value, use it
  if (overrideSlug) return overrideSlug;
  
  // If we're updating and there's no override, keep the original slug
  if (originalDoc && originalDoc.slug) return originalDoc.slug;
  
  let baseValue = data?.[fieldToUse] as string;
  
  // For localized fields, handle both string and object formats
  if (baseValue && typeof baseValue === 'object') {
    baseValue = baseValue[Object.keys(baseValue)[0]] as string;
  }
  
  if (!baseValue) return '';
  
  return baseValue
    .toLowerCase() // Convert to lowercase
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ż/g, 'z')
    .replace(/ź/g, 'z') // Replace Polish characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-+/, '') // Trim hyphens from start
    .replace(/-+$/, ''); // Trim hyphens from end
};