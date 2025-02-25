export const generateThemeCSS = (themeSettings: any) => {
  const {
	colors = {},
	typography = {},
	customCSS = '',
  } = themeSettings || {};

  return `
	:root {
	  --color-primary: ${colors.primary || '#0066CC'};
	  --color-secondary: ${colors.secondary || '#003366'};
	  --color-accent: ${colors.accent || '#FF9900'};
	  --font-heading: ${typography.headingFont || 'Inter'};
	  --font-body: ${typography.bodyFont || 'Inter'};
	}

	html {
	  font-family: var(--font-body), system-ui, sans-serif;
	}

	h1, h2, h3, h4, h5, h6 {
	  font-family: var(--font-heading), system-ui, sans-serif;
	}

	/* Custom CSS */
	${customCSS}
  `;
};