// src/admin/components/DashboardBanner.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useAdminTheme } from '../providers/AdminThemeProvider';

const DashboardBanner: React.FC = () => {
  const { 
    primaryColor, 
    orgName, 
    welcomeTitle, 
    welcomeText,
    isWhiteLabel,
    isLoading
  } = useAdminTheme();
  
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  
  // Fetch logo for the banner
  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === 'undefined') return;
    
    const fetchLogo = async () => {
      try {
        // Get serverURL from window
        const serverURL = window.location.origin;
        
        const response = await fetch(`${serverURL}/api/theme-settings?limit=1`);
        const result = await response.json();
        
        if (result && result.docs && result.docs.length > 0) {
          const data = result.docs[0];
          
          let url = data?.branding?.logo?.url;
          if (url && typeof url === 'string') {
            // Make sure URL is absolute
            if (url.startsWith('/')) {
              // Fix paths to use /media instead of /api/media
              if (url.includes('/api/media/')) {
                url = url.replace('/api/media/', '/media/');
              }
              // Make relative URLs absolute
              url = `${window.location.origin}${url}`;
            }
            setLogoUrl(url);
          }
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };
    
    fetchLogo();
  }, []);
  
  // If still loading, show minimal banner
  if (isLoading) {
    return (
      <div
        style={{
          backgroundColor: 'var(--theme-brand-500)',
          color: 'white',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 style={{ color: 'white', marginBottom: '10px', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: primaryColor,
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        {logoUrl && (
          <div style={{ marginRight: '15px' }}>
            <img 
              src={logoUrl} 
              alt={orgName} 
              style={{ 
                maxHeight: '40px', 
                maxWidth: '100px', 
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)' // Make logo white
              }} 
            />
          </div>
        )}
        <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
          {welcomeTitle} {!isWhiteLabel && orgName}
        </h2>
      </div>
      <p style={{ color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
        {welcomeText}
        {!isWhiteLabel && ' Jeśli potrzebujesz pomocy, skontaktuj się z administratorem systemu.'}
      </p>
    </div>
  );
};

export default DashboardBanner;