import { theme } from './theme';

/**
 * Color utility functions for consistent color usage throughout the app
 * All colors should use these utilities instead of hardcoded hex values
 */

// Get theme colors
export const colors = theme.colors;

// Color palette shortcuts
export const sakura = colors?.sakura ?? [];
export const warm = colors?.warm ?? [];
export const earth = colors?.earth ?? [];
export const pink = colors?.pink ?? [];

// Helper function to get color with opacity
const withOpacity = (color: string, opacity: number): string => {
  // Validate opacity
  if (opacity < 0 || opacity > 1) {
    console.warn(`withOpacity: Invalid opacity value ${opacity}. Must be between 0 and 1.`);
    opacity = Math.max(0, Math.min(1, opacity));
  }

  // Handle different color formats
  if (!color || typeof color !== 'string') {
    console.warn(`withOpacity: Invalid color input: ${color}. Using fallback color.`);
    return `rgba(0, 0, 0, ${opacity})`;
  }

  // Handle hex colors (#fff, #ffffff, #fffff0)
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');

    // Validate hex format
    if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex)) {
      console.warn(`withOpacity: Invalid hex color format: ${color}. Using fallback color.`);
      return `rgba(0, 0, 0, ${opacity})`;
    }

    // Convert 3-digit hex to 6-digit
    const fullHex =
      hex.length === 3
        ? hex
            .split('')
            .map(char => char + char)
            .join('')
        : hex;

    const r = parseInt(fullHex.slice(0, 2), 16);
    const g = parseInt(fullHex.slice(2, 4), 16);
    const b = parseInt(fullHex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  // Handle rgb/rgba colors
  if (color.startsWith('rgb')) {
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
  }

  // Fallback for unknown color formats
  console.warn(`withOpacity: Unsupported color format: ${color}. Using fallback color.`);
  return `rgba(0, 0, 0, ${opacity})`;
};

// Export the function
export { withOpacity };

// Common color combinations
export const colorCombinations = {
  // Primary sakura gradients
  sakuraGradient: `linear-gradient(135deg, ${sakura[3]}, ${sakura[1]})`,
  sakuraGradientLight: `linear-gradient(135deg, ${sakura[1]}, ${sakura[0]})`,

  // Pink gradients for sakura effects
  pinkGradient: `linear-gradient(135deg, ${pink[3]}, ${pink[1]})`,
  pinkGradientLight: `linear-gradient(135deg, ${pink[1]}, ${pink[0]})`,

  // Footer gradient (theme-aware)
  footerGradient: `linear-gradient(135deg, ${sakura[0]}, ${warm[1]})`,

  // Technical modal gradients (earth-tone themed)
  earthGradientModal: `linear-gradient(135deg, ${earth[0]}, ${earth[1]})`,
  warmGradientModal: `linear-gradient(135deg, ${warm[0]}, ${warm[1]})`,
  sakuraGradientModal: `linear-gradient(135deg, ${sakura[0]}, ${sakura[1]})`,
};

// Common color usage patterns
export const commonColors = {
  // Text colors
  textPrimary: warm[5] ?? '#2C2C2C',
  textSecondary: warm[4] ?? '#666666',
  textMuted: warm[3] ?? '#999999',
  textInverse: warm[0] ?? '#FDFCFB',

  // Background colors
  backgroundPrimary: warm[0] ?? '#FDFCFB',
  backgroundSecondary: warm[1] ?? '#F5F5F5',
  backgroundCard: warm[0] ?? '#FDFCFB',
  backgroundHero: `linear-gradient(135deg, ${warm[0]}, ${sakura[0]})`,
  backgroundWork: earth[0] ?? '#F9F7F4',
  backgroundContact: sakura[0] ?? '#FFF8F8',

  // Border colors
  borderPrimary: warm[2] ?? '#E8E8E8',
  borderSecondary: sakura[1] ?? '#FFCDD2',
  borderFocus: sakura[5] ?? '#D32F2F',

  // Accent colors (using darker shades for better contrast)
  accentPrimary: sakura[5] ?? '#D32F2F',
  accentSecondary: sakura[1] ?? '#FFCDD2',

  // Shadow colors (theme-aware)
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowMedium: 'rgba(0, 0, 0, 0.1)',
  shadowHeavy: 'rgba(0, 0, 0, 0.15)',
  shadowSakura: withOpacity(sakura[3] ?? '#F44336', 0.25),

  // Technical modal colors (theme-aware)
  backgroundModal: warm[0] ?? '#FDFCFB',
  borderModal: warm[2] ?? '#E8E8E8',
  borderEarth: earth[2] ?? '#D4A574',
  borderWarm: warm[2] ?? '#E8E8E8',
  borderSakura: sakura[1] ?? '#FFCDD2',
};

// Helper function to get theme color by name and shade
export const getThemeColor = (colorName: keyof typeof colors, shade: number = 3): string => {
  return colors?.[colorName]?.[shade] ?? '#000000';
};

// Type definitions for better TypeScript support
export type ColorPalette = keyof typeof colors;
export type ColorShade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
