'use client';

import React, { useEffect, useState } from 'react';

const Icon: React.FC = () => {
  const [icon, setIcon] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState<string>('#0066CC');
  
  useEffect(() => {
    // Skip on the server side
    if (typeof window === 'undefined') return;
    
    // Fetch the icon from the API
    const fetchIconFromSettings = async () => {
      try {
        // Get server URL from window
        const serverURL = window.location.origin;
        
        const response = await fetch(`${serverURL}/api/theme-settings?limit=1`);
        const result = await response.json();
        
        if (result && result.docs && result.docs.length > 0) {
          const data = result.docs[0];
          
          // Try to find an icon in the following order:
          // 1. Custom icon
          // 2. Favicon
          // 3. Logo
          if (data?.branding?.icon?.url) {
            setIcon(data.branding.icon.url);
          } else if (data?.branding?.favicon?.url) {
            setIcon(data.branding.favicon.url);
          } else if (data?.branding?.logo?.url) {
            setIcon(data.branding.logo.url);
          }
          
          // Get primary color
          if (data?.colors?.primary) {
            setPrimaryColor(data.colors.primary);
          }
        }
      } catch (error) {
        console.error('Error fetching icon:', error);
      }
    };
    
    fetchIconFromSettings();
  }, []);

  if (icon) {
    return (
      <div style={{ 
        padding: '0.5rem', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img 
          src={icon} 
          alt="Icon" 
          style={{ 
            maxWidth: '30px', 
            maxHeight: '30px',
            objectFit: 'contain'
          }} 
        />
      </div>
    );
  }

  // Fallback if no icon is available - simple SVG square
  return (
    <div style={{ padding: '0.5rem' }}>
      <svg 
        width="30" 
        height="30"
        viewBox="0 0 30 30" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="5"
          width="20"
          height="20"
          rx="4"
          fill={primaryColor}
        />
      </svg>
    </div>
  );
};

export default Icon;