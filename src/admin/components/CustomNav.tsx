'use client';

import React, { useEffect, useState } from 'react';
import { useConfig } from '@payloadcms/ui';
import { pl } from '../../i18n/pl';

// This component will override the navigation labels in the admin panel
// to ensure they're properly translated based on the current language
const CustomNav: React.FC = () => {
  const [currentLanguage, setCurrentLanguage] = useState('pl');
  const { collections } = useConfig();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get the current language from localStorage
      const savedLanguage = localStorage.getItem('admin-language') || 'pl';
      setCurrentLanguage(savedLanguage);
      
      // Define translations for collections and groups
      const translations = {
        pl: {
          groups: {
            'Main': 'Główne',
            'Settings': 'Ustawienia',
            'System': 'System',
          },
          collections: {
            'pages': pl.collections.pages.label || 'Strony',
            'events': pl.collections.events.label || 'Wydarzenia',
            'members': pl.collections.members.label || 'Członkowie',
            'theme-settings': pl.collections['theme-settings'].label || 'Ustawienia motywu',
            'main-menu': pl.collections.mainMenu.label || 'Menu',
            'media': pl.collections.media.label || 'Media',
            'users': pl.collections.users.label || 'Użytkownicy',
          }
        },
        en: {
          groups: {
            'Main': 'Main',
            'Settings': 'Settings',
            'System': 'System',
          },
          collections: {
            'pages': 'Pages',
            'events': 'Events',
            'members': 'Members',
            'theme-settings': 'Theme Settings',
            'main-menu': 'Main Menu',
            'media': 'Media',
            'users': 'Users',
          }
        }
      };
      
      // Function to update navigation labels
      const updateNavLabels = () => {
        try {
          // Handle group headers in both English and Polish mode
          document.querySelectorAll('.nav-group-header').forEach(header => {
            const headerText = header.textContent?.trim();
            if (!headerText) return;
            
            // In Polish mode, translate English headers to Polish
            if (savedLanguage === 'pl' && translations.pl.groups[headerText]) {
              header.textContent = translations.pl.groups[headerText];
            }
            
            // In English mode, ensure Polish headers are translated to English
            if (savedLanguage === 'en') {
              // Find the English equivalent for this Polish header
              for (const [enKey, plValue] of Object.entries(translations.pl.groups)) {
                if (plValue === headerText) {
                  header.textContent = enKey;
                  break;
                }
              }
            }
          });
          
          // Handle collection labels - first by URL pattern
          const allCollectionSlugs = Object.keys(translations.pl.collections);
          
          allCollectionSlugs.forEach(slug => {
            // Match by URL pattern to find collection links
            document.querySelectorAll(`a[href*="/admin/collections/${slug}"], a[href*="/${slug}"]`).forEach(link => {
              const labelElement = link.querySelector('.nav-label');
              
              if (labelElement) {
                // Apply the appropriate translation based on current language
                if (savedLanguage === 'pl' && translations.pl.collections[slug]) {
                  labelElement.textContent = translations.pl.collections[slug];
                } else if (savedLanguage === 'en' && translations.en.collections[slug]) {
                  labelElement.textContent = translations.en.collections[slug];
                }
              }
            });
          });
          
          // Alternative approach: match via the text content
          document.querySelectorAll('.nav-label').forEach(label => {
            const text = label.textContent?.trim();
            if (!text) return;
            
            // If we're in Polish mode but seeing English labels
            if (savedLanguage === 'pl') {
              // Check if this text matches any English collection label
              for (const [slug, enLabel] of Object.entries(translations.en.collections)) {
                if (text === enLabel && translations.pl.collections[slug]) {
                  label.textContent = translations.pl.collections[slug];
                  break;
                }
              }
            }
            
            // If we're in English mode but seeing Polish labels
            if (savedLanguage === 'en') {
              // Check if this text matches any Polish collection label
              for (const [slug, plLabel] of Object.entries(translations.pl.collections)) {
                if (text === plLabel && translations.en.collections[slug]) {
                  label.textContent = translations.en.collections[slug];
                  break;
                }
              }
            }
          });
          
          // Force update collection headers in collection list views
          if (window.location.pathname.includes('/admin/collections/')) {
            const collectionHeader = document.querySelector('.collection-edit__header h1');
            if (collectionHeader) {
              const match = window.location.pathname.match(/\/admin\/collections\/([a-z-]+)/i);
              if (match && match[1]) {
                const slug = match[1];
                if (savedLanguage === 'pl' && translations.pl.collections[slug]) {
                  collectionHeader.textContent = translations.pl.collections[slug];
                } else if (savedLanguage === 'en' && translations.en.collections[slug]) {
                  collectionHeader.textContent = translations.en.collections[slug];
                }
              }
            }
          }
        } catch (error) {
          console.error('Error updating navigation labels:', error);
        }
      };
      
      // Apply translations at multiple intervals to ensure they stick
      // Sometimes PayloadCMS re-renders the navigation after initial load
      const intervalCheckTimes = [100, 500, 1000, 2000, 5000];
      const timers: NodeJS.Timeout[] = [];
      
      intervalCheckTimes.forEach(time => {
        const timer = setTimeout(updateNavLabels, time);
        timers.push(timer);
      });
      
      // Apply translations whenever DOM changes
      const observer = new MutationObserver((mutations) => {
        // Only update if we find relevant navigation elements being changed
        const shouldUpdate = mutations.some(mutation => {
          return Array.from(mutation.addedNodes).some(node => {
            // Check if the node or its children contain navigation elements
            if (node instanceof HTMLElement) {
              return (
                node.classList?.contains('nav-group') ||
                node.classList?.contains('nav-label') ||
                node.querySelector('.nav-group, .nav-label, .nav-group-header')
              );
            }
            return false;
          });
        });
        
        if (shouldUpdate) {
          updateNavLabels();
        }
      });
      
      // Start observing document changes
      observer.observe(document.body, { 
        childList: true, 
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'href'] 
      });
      
      // Run continuous check for 3 minutes to ensure UI stays translated
      // This helps with dynamic content that might be loaded later
      let count = 0;
      const longIntervalId = setInterval(() => {
        updateNavLabels();
        count++;
        if (count >= 36) { // 3 minutes (36 * 5000ms)
          clearInterval(longIntervalId);
        }
      }, 5000);
      
      // Clean up all timers and observers on unmount
      return () => {
        timers.forEach(timer => clearTimeout(timer));
        clearInterval(longIntervalId);
        observer.disconnect();
      };
    }
  }, [collections, currentLanguage]);
  
  // Listen for language changes from other components
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'admin-language') {
        setCurrentLanguage(event.newValue || 'pl');
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

export default CustomNav;