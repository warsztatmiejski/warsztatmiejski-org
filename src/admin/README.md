# White Labeling the PayloadCMS Admin Panel

This implementation follows the official PayloadCMS white labeling example approach to customize the admin panel with your own branding. It uses components in the `/src/admin/graphics` directory and dynamic settings from the ThemeSettings collection.

## Key Components

### Logo and Icon Graphics

- **Logo** (`/src/admin/graphics/Logo.tsx`): Displayed on the login screen and other key areas
- **Icon** (`/src/admin/graphics/Icon.tsx`): Shown in the admin panel navigation

These components dynamically fetch data from ThemeSettings to display your custom branding assets.

### Theme Provider

- **AdminThemeProvider** (`/src/admin/providers/AdminThemeProvider.tsx`): Provides theme settings to components via context
- Sets CSS variables for PayloadCMS UI components to use your brand colors
- Handles the white labeling mode toggle

### Admin Components 

- **Dashboard** (`/src/admin/components/Dashboard.tsx`): Customized dashboard showing your branding
- **DashboardBanner** (`/src/admin/components/DashboardBanner.tsx`): Welcome banner with organization name and custom message

## Theme Settings in Database

The following fields in ThemeSettings control white labeling:

1. **Media Assets**:
   - `branding.logo`: Main logo used throughout the admin
   - `branding.icon`: Icon used for favicon and small brand elements
   - `branding.favicon`: Custom favicon (falls back to icon)
   - `branding.ogImage`: Image for social media sharing

2. **Branding Text**:
   - `branding.adminTitle`: Admin panel title
   - `branding.adminWelcomeTitle`: Welcome banner title
   - `branding.adminWelcomeText`: Welcome message

3. **Colors**:
   - `colors.primary`: Primary brand color
   - `colors.secondary`: Secondary brand color
   - `colors.accent`: Accent color for highlights

4. **White Label Mode**:
   - `admin.useWhiteLabel`: Toggle for branded/generic mode
   - `admin.orgName`: Organization name when white labeled

## How to Use

1. **Update Theme Settings**: In the admin panel, navigate to Theme Settings
2. **Upload Logo & Icon**: Add your brand images
3. **Set Colors**: Choose colors that match your brand
4. **Configure Text**: Set welcome messages and titles
5. **Toggle White Label**: Enable/disable the white label mode as needed

## Environment Variables

You can also set the admin title via environment variable:
- `NEXT_PUBLIC_ADMIN_TITLE`: Fallback admin title

## Implementation Details

This implementation uses direct imports for the graphics components in payload.config.ts, which is the recommended approach from PayloadCMS. The components fetch their data dynamically from the API to ensure they always display the most current branding.