'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useConfig } from '@payloadcms/ui';

// Define the theme type
type AdminThemeType = {
  orgName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  welcomeTitle: string;
  welcomeText: string;
  isWhiteLabel: boolean;
  isLoading: boolean;
  logoUrl: string | null;
  iconUrl: string | null;
};

// Default theme values
const defaultTheme: AdminThemeType = {
  orgName: 'Warsztat Miejski',
  primaryColor: '#0066CC',
  secondaryColor: '#003366',
  accentColor: '#FF9900',
  welcomeTitle: 'Witaj w panelu administracyjnym',
  welcomeText: 'Tutaj możesz zarządzać treścią strony, wydarzeniami i członkami społeczności.',
  isWhiteLabel: false,
  isLoading: false,
  logoUrl: null,
  iconUrl: null,
};

// Theme context for admin components with null check for SSR
export const AdminThemeContext = createContext<AdminThemeType>(defaultTheme);

export const useAdminTheme = () => useContext(AdminThemeContext);

// Provider component that fetches theme settings
const AdminThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeData, setThemeData] = useState(defaultTheme);
  const [cssApplied, setCssApplied] = useState(false);
  const { publicFacing, serverURL } = useConfig();
  
  // Fetch theme settings using fetch API
  useEffect(() => {
    const fetchThemeSettings = async () => {
      try {
        setThemeData(prev => ({ ...prev, isLoading: true }));
        
        // Fetch the first theme settings document
        const response = await fetch(`${serverURL}/api/theme-settings?limit=1`);
        const result = await response.json();
        
        if (result && result.docs && result.docs.length > 0) {
          const data = result.docs[0];
          
          // Get theme settings from payload data
          const useWhiteLabel = data?.admin?.useWhiteLabel || false;
          const primaryColor = data?.colors?.primary || '#0066CC';
          const secondaryColor = data?.colors?.secondary || '#003366';
          const accentColor = data?.colors?.accent || '#FF9900';
          
          // Process logo and icon URLs
          let logoUrl = data?.branding?.logo?.url || null;
          let iconUrl = data?.branding?.icon?.url || null;
          
          // Fix path issues by replacing /api/media/ with /media/
          if (logoUrl && typeof logoUrl === 'string') {
            if (logoUrl.startsWith('/')) {
              if (logoUrl.includes('/api/media/')) {
                logoUrl = logoUrl.replace('/api/media/', '/media/');
              }
              logoUrl = `${window.location.origin}${logoUrl}`;
            }
          }
          
          if (iconUrl && typeof iconUrl === 'string') {
            if (iconUrl.startsWith('/')) {
              if (iconUrl.includes('/api/media/')) {
                iconUrl = iconUrl.replace('/api/media/', '/media/');
              }
              iconUrl = `${window.location.origin}${iconUrl}`;
            }
          }
          
          // Update theme data state
          setThemeData({
            orgName: useWhiteLabel ? data?.admin?.orgName || 'Organization' : 'Warsztat Miejski',
            primaryColor: primaryColor,
            secondaryColor: secondaryColor,
            accentColor: accentColor,
            welcomeTitle: data?.branding?.adminWelcomeTitle || 'Witaj w panelu administracyjnym',
            welcomeText: data?.branding?.adminWelcomeText || 'Tutaj możesz zarządzać treścią strony, wydarzeniami i członkami społeczności.',
            isWhiteLabel: useWhiteLabel,
            isLoading: false,
            logoUrl: logoUrl,
            iconUrl: iconUrl,
          });
          
          // Set CSS variables
          if (!cssApplied) {
            const root = document.documentElement;
            
            // Update theme-brand variables which are used by PayloadCMS UI
            root.style.setProperty('--theme-brand-500', primaryColor);
            root.style.setProperty('--theme-brand-900', secondaryColor);
            
            setCssApplied(true);
          }
        } else {
          setThemeData(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error fetching theme settings:', error);
        setThemeData(prev => ({ ...prev, isLoading: false }));
      }
    };

    if (!publicFacing && serverURL) {
      fetchThemeSettings();
    }
  }, [publicFacing, serverURL, cssApplied]);

  // Check if we're on the client-side before rendering the actual provider
  const isClient = typeof window !== 'undefined';
  
  // For server-side rendering, just pass the default values
  if (!isClient || publicFacing) {
    return <>{children}</>;
  }
  
  // Only render the provider with actual theme data on the client
  return (
    <AdminThemeContext.Provider value={themeData}>
      {children}
    </AdminThemeContext.Provider>
  );
};

export default AdminThemeProvider;