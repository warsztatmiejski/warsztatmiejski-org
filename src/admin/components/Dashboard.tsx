'use client';

import React, { useEffect, useState } from 'react';
import { useConfig } from '@payloadcms/ui';
import { useAdminTheme } from '../providers/AdminThemeProvider';

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
        const recentPagesResponse = await fetch(`${serverURL}/api/pages?limit=5&sort=-updatedAt`);
        const recentPagesData = await recentPagesResponse.json();

        const recentEventsResponse = await fetch(`${serverURL}/api/events?limit=5&sort=-updatedAt`);
        const recentEventsData = await recentEventsResponse.json();

        // Make sure we have docs before trying to map them
        const pagesActivity = Array.isArray(recentPagesData?.docs) 
          ? recentPagesData.docs
              .filter((doc: any) => doc && doc.id) // Ensure doc exists and has an id
              .map((doc: any) => ({
                id: doc.id,
                collection: 'pages',
                title: doc.title || 'Untitled Page',
                updatedAt: doc.updatedAt || new Date().toISOString(),
                user: doc.updatedBy
              }))
          : [];
          
        const eventsActivity = Array.isArray(recentEventsData?.docs)
          ? recentEventsData.docs
              .filter((doc: any) => doc && doc.id) // Ensure doc exists and has an id
              .map((doc: any) => ({
                id: doc.id,
                collection: 'events',
                title: doc.title || 'Untitled Event',
                updatedAt: doc.updatedAt || new Date().toISOString(),
                user: doc.updatedBy
              }))
          : [];
          
        // Combine and sort by updatedAt
        const combinedActivity = [
          ...pagesActivity,
          ...eventsActivity
        ]
        .sort((a, b) => {
          // Ensure we have dates to compare
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
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

  return (
    <div className="dashboard">
      <h1 style={{ margin: '20px 0', fontSize: '1.5rem', fontWeight: 'bold' }}>
        {isWhiteLabel ? 'Panel Administracyjny' : `Panel Administracyjny ${orgName}`}
      </h1>

      {loading ? (
        <p>Ładowanie danych...</p>
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
              Ostatnia Aktywność
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
                          Kolekcja: {activity.collection}
                          {activity.user && ` • Użytkownik: ${activity.user.email}`}
                        </p>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                        {new Date(activity.updatedAt).toLocaleString('pl-PL')}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Brak ostatniej aktywności</p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ marginTop: '30px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '15px' }}>
              Szybkie Akcje
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
                      Dodaj {collection.labels?.singular || collection.slug}
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