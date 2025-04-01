'use client';

import React from 'react';
import { useAdminTheme } from '../providers/AdminThemeProvider';

const CustomIcon: React.FC = () => {
  const { primaryColor, iconUrl, orgName } = useAdminTheme();

  // If we have a custom icon, use it
  if (iconUrl && typeof iconUrl === 'string') {
    return (
      <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img 
          src={iconUrl} 
          alt={orgName} 
          style={{ 
            maxHeight: '32px', 
            maxWidth: '32px', 
            objectFit: 'contain' 
          }} 
        />
      </div>
    );
  }

  // Fallback to SVG icon
  return (
    <svg 
      width="32" 
      height="32"
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect 
        x="6" 
        y="6" 
        width="20" 
        height="20" 
        rx="6" 
        fill={primaryColor || "var(--theme-brand-500)"} 
      />
    </svg>
  );
};

export default CustomIcon;