'use client';

import React, { useEffect, useState } from 'react';
import { useConfig } from '@payloadcms/ui';
import { useAdminTheme } from '../providers/AdminThemeProvider';
import { t } from '../../lib/getActiveLanguage';

// Define types for our data
type CollectionCounts = {
  [key: string]: number;
};

type RecentActivity = {
  id: string;
  collection: string;
  title?: string;
  updatedAt: string;
  user?: {
    email: string;
  };
};


const Dashboard: React.FC = () => {
  const { collections, serverURL } = useConfig();
  const { primaryColor, orgName, isWhiteLabel } = useAdminTheme();
  const [counts, setCounts] = useState<CollectionCounts>({});
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data for the dashboard
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch collection counts
      const collectionCountsPromises = collections.map(async (collection) => {
        try {
          const response = await fetch(`${serverURL}/api/${collection.slug}/count`);
          const data = await response.json();
          return { [collection.slug]: data.count };
        } catch (error) {
          console.error(`Error fetching count for ${collection.slug}:`, error);
          return { [collection.slug]: 0 };
        }
      });

      const collectionCountsArray = await Promise.all(collectionCountsPromises);
      const collectionCountsObject = collectionCountsArray.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setCounts(collectionCountsObject);

      // Fetch recent activity
      try {
        // This is a simplified version. In a real app, you'd need to implement an endpoint for this
        let pagesActivity: RecentActivity[] = [];
        let eventsActivity: RecentActivity[] = [];
        
        try {
          const recentPagesResponse = await fetch(`${serverURL}/api/pages?limit=5&sort=-updatedAt`);
          const recentPagesData = await recentPagesResponse.json();

          // Make sure we have docs before trying to map them
          if (recentPagesData && Array.isArray(recentPagesData.docs)) {
            pagesActivity = recentPagesData.docs
              .filter((doc: any) => doc && doc.id) // Ensure doc exists and has an id
              .map((doc: any) => ({
                id: doc.id,
                collection: 'pages',
                title: doc.title || 'Untitled Page',
                updatedAt: doc.updatedAt || new Date().toISOString(),
                user: doc.updatedBy
              }));
          }
        } catch (error) {
          console.error('Error fetching pages activity:', error);
        }
        
        try {
          const recentEventsResponse = await fetch(`${serverURL}/api/events?limit=5&sort=-updatedAt`);
          const recentEventsData = await recentEventsResponse.json();
          
          if (recentEventsData && Array.isArray(recentEventsData.docs)) {
            eventsActivity = recentEventsData.docs
              .filter((doc: any) => doc && doc.id) // Ensure doc exists and has an id
              .map((doc: any) => ({
                id: doc.id,
                collection: 'events',
                title: typeof doc.title === 'string' ? doc.title : (doc.title?.pl || doc.title?.en || 'Untitled Event'),
                updatedAt: doc.updatedAt || new Date().toISOString(),
                user: doc.updatedBy
              }));
          }
        } catch (error) {
          console.error('Error fetching events activity:', error);
        }
          
        // Combine and sort by updatedAt
        const combinedActivity = [
          ...(Array.isArray(pagesActivity) ? pagesActivity : []),
          ...(Array.isArray(eventsActivity) ? eventsActivity : [])
        ]
        .sort((a, b) => {
          // Ensure we have dates to compare
          const dateA = a?.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const dateB = b?.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 5);

        setRecentActivity(combinedActivity);
      } catch (error) {
        console.error('Error fetching recent activity:', error);
      }

      setLoading(false);
    };

    fetchData();
  }, [collections, serverURL]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      const dropdowns = document.querySelectorAll('[data-dropdown]');
      dropdowns.forEach(dropdown => {
        if (dropdown.classList.contains('open')) {
          dropdown.classList.remove('open');
        }
      });
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="dashboard">
      {/* Header with title */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        margin: '20px 0'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
          {isWhiteLabel 
            ? t('Panel Administracyjny', 'Admin Dashboard')
            : t(`Panel Administracyjny ${orgName}`, `${orgName} Admin Dashboard`)}
        </h1>
      </div>

      {loading ? (
        <p>{t('Ładowanie danych...', 'Loading data...')}</p>
      ) : (
        <>
          {/* Collection Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {collections.map((collection) => (
              <div key={collection.slug} style={{
                padding: '15px',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ padding: '0 0 10px 0', borderBottom: '1px solid #f3f4f6' }}>
                  <p style={{ fontSize: '0.875rem', fontWeight: 'normal', color: '#6b7280', margin: 0 }}>
                    {collection.labels?.plural || collection.slug}
                  </p>
                </div>
                <div style={{ padding: '10px 0 0 0' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                    {counts[collection.slug] || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '15px' }}>
              {t('Ostatnia Aktywność', 'Recent Activity')}
            </h2>
            <div style={{
              padding: '15px',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              {recentActivity.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {recentActivity.map((activity) => (
                    <li key={`${activity.collection}-${activity.id}`} style={{
                      padding: '12px 0',
                      borderBottom: '1px solid #f3f4f6',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <p style={{ fontWeight: 'bold', margin: 0 }}>
                          {activity.title || `${activity.collection} #${activity.id}`}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                          {t('Kolekcja', 'Collection')}: {activity.collection}
                          {activity.user && ` • ${t('Użytkownik', 'User')}: ${activity.user.email}`}
                        </p>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                        {new Date(activity.updatedAt).toLocaleString(t('pl-PL', 'en-US'))}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{t('Brak ostatniej aktywności', 'No recent activity')}</p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '15px' }}>
              {t('Szybkie Akcje', 'Quick Actions')}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '15px'
            }}>
              {collections.filter(c => ['pages', 'events', 'members'].includes(c.slug)).map((collection) => (
                <a
                  key={`create-${collection.slug}`}
                  href={`/admin/collections/${collection.slug}/create`}
                  style={{
                    padding: '15px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    backgroundColor: 'var(--theme-brand-500)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    color: 'white'
                  }}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5V19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p style={{ fontWeight: 'bold', margin: 0 }}>
                      {t(`Dodaj ${collection.labels?.singular || collection.slug}`, 
                         `Add ${collection.labels?.singular || collection.slug}`)}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;