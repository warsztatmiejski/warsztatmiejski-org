// This file is kept for compatibility but no longer used
// We now rely on PayloadCMS's built-in i18n system

/**
 * Helper function to get the active admin language
 * @deprecated Use PayloadCMS's built-in i18n system instead
 */
export const getActiveLanguage = (): 'pl' | 'en' => {
  return 'pl'; // Default to Polish
};

/**
 * Helper function to translate text based on active language
 * @deprecated Use PayloadCMS's built-in i18n system instead
 */
export const t = (pl: string, en: string): string => {
  return pl; // Default to Polish
};