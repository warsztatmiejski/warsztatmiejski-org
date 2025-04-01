'use client';

import React, { useEffect, useState } from 'react';

const Logo: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [name, setName] = useState<string>('Warsztat Miejski');
  
  useEffect(() => {
    // Skip on the server side
    if (typeof window === 'undefined') return;
    
    // Fetch the logo from the API
    const fetchLogoFromSettings = async () => {
      try {
        // Get server URL from window
        const serverURL = window.location.origin;
        
        const response = await fetch(`${serverURL}/api/theme-settings?limit=1`);
        const result = await response.json();
        
        if (result && result.docs && result.docs.length > 0) {
          const data = result.docs[0];
          
          // Check for logo
          if (data?.branding?.logo?.url) {
            setLogo(data.branding.logo.url);
          }
          
          // Set organization name
          if (data?.admin?.useWhiteLabel && data?.admin?.orgName) {
            setName(data.admin.orgName);
          }
        }
      } catch (error) {
        console.error('Error fetching logo:', error);
      }
    };
    
    fetchLogoFromSettings();
  }, []);

  if (logo) {
    return (
      <div 
        style={{ 
          textAlign: 'center', 
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <img 
          src={logo} 
          alt={name}
          style={{ 
            maxWidth: '250px', 
            maxHeight: '80px',
            marginBottom: '1rem'
          }} 
        />
        <h1 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 500,
          margin: 0
        }}>
          {name}
        </h1>
      </div>
    );
  }

  // Fallback if no logo is available
  return (
    <div 
      style={{ 
        textAlign: 'center', 
        marginBottom: '2rem' 
      }}
    >
      <h1 style={{ 
        fontSize: '1.5rem', 
        fontWeight: 500,
        margin: 0
      }}>
        {name}
      </h1>
    </div>
  );
};

export default Logo;