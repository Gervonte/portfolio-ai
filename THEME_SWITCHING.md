# Theme Switching Implementation

## Overview

Your portfolio now supports dynamic theme switching between two beautiful color palettes:

- **Sakura Theme** (Default): Cherry blossom-inspired reds and pinks
- **Ocean Theme**: Ocean mist-inspired teals and cyans

## How It Works

### 1. Theme Toggle Button

- Located in the header navigation (desktop and mobile)
- Click to switch between themes
- Hover effects with smooth animations
- Tooltip shows current theme and next theme

### 2. Automatic Persistence

- Theme preference is saved to localStorage
- Theme persists across browser sessions
- Defaults to Sakura theme on first visit

### 3. Real-time Switching

- Instant theme changes without page reload
- All components update immediately
- Smooth transitions between color schemes

## Implementation Details

### Files Created/Modified

#### New Files:

- `src/lib/themes.ts` - Theme definitions
- `src/lib/theme-context.tsx` - React context for theme management
- `src/components/ThemeToggle.tsx` - Toggle button component
- `src/components/ThemeWrapper.tsx` - Mantine provider wrapper

#### Modified Files:

- `src/app/layout.tsx` - Updated to use theme context
- `src/components/Header.tsx` - Added theme toggle button

### Usage in Components

```tsx
import { useTheme, useCurrentTheme } from '@/lib/theme-context';

function MyComponent() {
  const { currentTheme, setTheme, toggleTheme } = useTheme();
  const theme = useCurrentTheme();

  // Access theme colors
  const primaryColor = theme.colors[theme.primaryColor][theme.primaryShade];

  return (
    <div>
      <p>Current theme: {currentTheme}</p>
      <button onClick={toggleTheme}>Switch Theme</button>
    </div>
  );
}
```

### Theme Structure

Each theme includes:

- **Primary Colors**: Main brand colors (sakura/ocean)
- **Warm Colors**: Neutrals and text colors
- **Earth Colors**: Supporting browns and beiges
- **Effect Colors**: For animations (pink/mist)

### Color Usage

The themes maintain the same structure, so your existing color usage will work with both themes:

```tsx
// This works with both themes
const colors = theme.colors;
const primaryColor = colors[theme.primaryColor][theme.primaryShade];
```

## Customization

### Adding New Themes

1. Add theme definition to `src/lib/themes.ts`
2. Update `ThemeName` type
3. Add to `themes` object
4. Update toggle logic in `ThemeToggle.tsx`

### Modifying Existing Themes

Edit the color arrays in `src/lib/themes.ts`:

```typescript
export const sakuraTheme = createTheme({
  colors: {
    sakura: [
      '#FFEBEE', // Lightest
      '#FFCDD2', // Light
      // ... more shades
      '#4A0E0E', // Darkest
    ],
    // ... other color palettes
  },
  // ... other theme properties
});
```

## Testing

1. Start your development server
2. Click the theme toggle button in the header
3. Verify colors change throughout the site
4. Refresh the page to test persistence
5. Check both desktop and mobile views

## Browser Support

- Modern browsers with localStorage support
- Graceful fallback to default theme if localStorage fails
- SSR-safe with proper hydration handling
