'use client';

import React, { useEffect, useState } from 'react';
import { useConfig } from '@payloadcms/ui';

/**
 * This component is not actually used for login functionality.
 * PayloadCMS manages login internally and this is just used
 * to show a logo above the login form.
 */
const LoginLogo: React.FC = () => {
  const { serverURL } = useConfig();
  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined);
  const [orgName, setOrgName] = useState('Warsztat Miejski');

  // Fetch theme settings on load
  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === 'undefined') return;
    
    const fetchThemeSettings = async () => {
      try {
        // Get server URL from window
        const serverURL = window.location.origin;
        
        const response = await fetch(`${serverURL}/api/theme-settings?limit=1`);
        const result = await response.json();
        
        if (result && result.docs && result.docs.length > 0) {
          const data = result.docs[0];
          let url = data?.branding?.logo?.url || (data?.branding?.logo?.sizes?.thumbnail?.url);
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
          
          // Set org name
          if (data?.admin?.useWhiteLabel && data?.admin?.orgName) {
            setOrgName(data.admin.orgName);
          } else if (!data?.admin?.useWhiteLabel) {
            setOrgName('Warsztat Miejski');
          }
        }
      } catch (error) {
        console.error('Error fetching theme settings:', error);
      }
    };

    fetchThemeSettings();
  }, []);

  // Fetch favicon for login page
  useEffect(() => {
    // Skip on server-side rendering
    if (typeof window === 'undefined') return;
    
    const fetchFavicon = async () => {
      try {
        // Get server URL from window
        const serverURL = window.location.origin;
        
        const response = await fetch(`${serverURL}/api/theme-settings?limit=1&depth=1`);
        const result = await response.json();
        
        if (result && result.docs && result.docs.length > 0) {
          const data = result.docs[0];
          
          // Set favicon if available
          let favicon = data?.branding?.favicon?.url || 
                      data?.branding?.icon?.url || 
                      (data?.branding?.icon?.sizes?.thumbnail?.url);
          
          if (favicon && typeof favicon === 'string') {
            // Make sure URL is absolute
            if (favicon.startsWith('/')) {
              // Fix paths to use /media instead of /api/media
              if (favicon.includes('/api/media/')) {
                favicon = favicon.replace('/api/media/', '/media/');
              }
              // Make relative URLs absolute
              favicon = `${window.location.origin}${favicon}`;
            }
            
            // Create a link element for favicon
            const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
            link.setAttribute('rel', 'icon');
            link.setAttribute('href', favicon);
            document.head.appendChild(link);
          }
        }
      } catch (error) {
        console.error('Error fetching favicon:', error);
      }
    };
    
    fetchFavicon();
  }, []);

  if (logoUrl) {
    return (
      <div className="login-logo" style={{ 
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <img 
          src={logoUrl} 
          alt={orgName} 
          style={{ 
            maxHeight: '60px', 
            maxWidth: '200px', 
            objectFit: 'contain',
            marginBottom: '1rem'
          }} 
        />
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>{orgName}</h1>
      </div>
    );
  }

  return (
    <div className="login-logo" style={{ 
      marginBottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{orgName}</h1>
    </div>
  );
};

export default LoginLogo;