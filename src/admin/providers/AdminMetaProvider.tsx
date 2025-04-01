'use client';

import React, { useEffect, useState } from 'react';
import { useConfig } from '@payloadcms/ui';
import Head from 'next/head';

const AdminMetaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { serverURL, admin } = useConfig();
  const [meta, setMeta] = useState({
    title: admin?.meta?.title || 'Admin',
    favicon: admin?.meta?.favicon || '/favicon.ico',
    ogImage: admin?.meta?.ogImage || '/admin-og-image.jpg',
  });

  // Fetch theme settings on load
  useEffect(() => {
    const fetchThemeSettings = async () => {
      try {
        // Fetch the first theme settings document
        const response = await fetch(`${serverURL}/api/theme-settings?limit=1`);
        const result = await response.json();
        
        if (result && result.docs && result.docs.length > 0) {
          const data = result.docs[0];
          
          // Update meta information based on theme settings
          const updatedMeta = { ...meta };
          
          // Set title suffix if available
          if (data?.branding?.adminTitle) {
            updatedMeta.title = `Admin - ${data.branding.adminTitle}`;
          }
          
          // Set favicon if available
          if (data?.branding?.favicon?.url) {
            updatedMeta.favicon = data.branding.favicon.url;
          } else if (data?.branding?.icon?.url) {
            updatedMeta.favicon = data.branding.icon.url;
          }
          
          // Set OG image if available
          if (data?.branding?.ogImage?.url) {
            updatedMeta.ogImage = data.branding.ogImage.url;
          } else if (data?.branding?.logo?.url) {
            updatedMeta.ogImage = data.branding.logo.url;
          }
          
          setMeta(updatedMeta);
        }
      } catch (error) {
        console.error('Error fetching theme settings for meta:', error);
      }
    };

    if (serverURL) {
      fetchThemeSettings();
    }
  }, [serverURL, meta]);

  return (
    <>
      <Head>
        {/* Favicon */}
        <link rel="icon" href={meta.favicon} />
        <link rel="shortcut icon" href={meta.favicon} />
        <link rel="apple-touch-icon" href={meta.favicon} />
        
        {/* OpenGraph */}
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:type" content="website" />
        
        {/* Title */}
        <title>{meta.title}</title>
      </Head>
      {children}
    </>
  );
};

export default AdminMetaProvider;