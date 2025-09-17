import { useCurrentTheme } from './theme-context';

/**
 * Theme-aware color utility functions
 * These functions automatically adapt to the current theme
 */

// Hook to get current theme colors
export function useThemeColors() {
  const theme = useCurrentTheme();
  return theme.colors || {};
}

// Hook to get primary color palette based on current theme
export function usePrimaryColors() {
  const theme = useCurrentTheme();
  const primaryColorName = theme.primaryColor as keyof typeof theme.colors;
  return (theme.colors?.[primaryColorName] as readonly string[]) || [];
}

// Hook to get effect colors (pink for sakura, mist for ocean)
export function useEffectColors() {
  const theme = useCurrentTheme();
  const isSakura = theme.primaryColor === 'sakura';
  const effectColorName = isSakura ? 'pink' : 'mist';
  return (theme.colors?.[effectColorName as keyof typeof theme.colors] as readonly string[]) || [];
}

// Hook to get warm colors (same for both themes)
export function useWarmColors() {
  const theme = useCurrentTheme();
  return (theme.colors?.warm as readonly string[]) || [];
}

// Hook to get earth colors (same for both themes)
export function useEarthColors() {
  const theme = useCurrentTheme();
  return (theme.colors?.earth as readonly string[]) || [];
}

// Hook to get common color combinations
export function useColorCombinations() {
  const primaryColors = usePrimaryColors();
  const effectColors = useEffectColors();
  const warmColors = useWarmColors();
  const earthColors = useEarthColors();

  return {
    // Primary gradients
    primaryGradient: `linear-gradient(135deg, ${primaryColors[3]}, ${primaryColors[1]})`,
    primaryGradientLight: `linear-gradient(135deg, ${primaryColors[1]}, ${primaryColors[0]})`,

    // Effect gradients
    effectGradient: `linear-gradient(135deg, ${effectColors[3]}, ${effectColors[1]})`,
    effectGradientLight: `linear-gradient(135deg, ${effectColors[1]}, ${effectColors[0]})`,

    // Footer gradient (theme-aware subtle colors)
    footerGradient: `linear-gradient(135deg, ${primaryColors[0]}, ${warmColors[1]})`,

    // Technical modal gradients
    earthGradientModal: `linear-gradient(135deg, ${earthColors[0]}, ${earthColors[1]})`,
    warmGradientModal: `linear-gradient(135deg, ${warmColors[0]}, ${warmColors[1]})`,
    primaryGradientModal: `linear-gradient(135deg, ${primaryColors[0]}, ${primaryColors[1]})`,
    sakuraGradientModal: `linear-gradient(135deg, ${primaryColors[0]}, ${primaryColors[1]})`, // Same as primaryGradientModal
  };
}

// Hook to get common color usage patterns
export function useCommonColors() {
  const primaryColors = usePrimaryColors();
  const warmColors = useWarmColors();
  const earthColors = useEarthColors();

  return {
    // Text colors (fallback to sakura theme)
    textPrimary: warmColors[5] ?? '#2C2C2C',
    textSecondary: warmColors[4] ?? '#666666',
    textMuted: warmColors[3] ?? '#999999',
    textInverse: warmColors[0] ?? '#FDFCFB',
    textOnPrimary: primaryColors[6] ?? '#C62828', // Dark text for primary backgrounds (sakura[6])
    textOnPrimaryLight: primaryColors[5] ?? '#D32F2F', // Medium text for primary backgrounds (sakura[5])

    // Background colors (fallback to sakura theme)
    backgroundPrimary: warmColors[0] ?? '#FDFCFB',
    backgroundSecondary: warmColors[1] ?? '#F5F5F5',
    backgroundCard: warmColors[0] ?? '#FDFCFB',
    backgroundHero: `linear-gradient(135deg, ${warmColors[0]}, ${primaryColors[0]})`,
    backgroundWork: earthColors[0] ?? '#FDF4E3',
    backgroundContact: primaryColors[0] ?? '#FFEBEE', // sakura[0]
    backgroundPrimaryLight: primaryColors[0] ?? '#FFEBEE', // Light primary background (sakura[0])
    backgroundPrimarySubtle: primaryColors[1] ?? '#FFCDD2', // Subtle primary background (sakura[1])

    // Border colors (fallback to sakura theme)
    borderPrimary: warmColors[2] ?? '#E8E8E8',
    borderSecondary: primaryColors[1] ?? '#FFCDD2', // sakura[1]
    borderFocus: primaryColors[3] ?? '#F44336', // sakura[3]
    borderPrimaryLight: primaryColors[2] ?? '#EF9A9A', // Primary-themed border (sakura[2])

    // Accent colors (fallback to sakura theme)
    accentPrimary: primaryColors[3] ?? '#F44336', // sakura[3]
    accentSecondary: primaryColors[1] ?? '#FFCDD2', // sakura[1]
    accentPrimaryDark: primaryColors[4] ?? '#E53935', // Darker primary accent (sakura[4])

    // Shadow colors (fallback to sakura theme)
    shadowLight: 'rgba(0, 0, 0, 0.05)',
    shadowMedium: 'rgba(0, 0, 0, 0.1)',
    shadowHeavy: 'rgba(0, 0, 0, 0.15)',
    shadowPrimary: `rgba(${hexToRgb(primaryColors[3] || '#F44336')}, 0.25)`, // sakura[3]
    shadowPrimaryLight: `rgba(${hexToRgb(primaryColors[3] || '#F44336')}, 0.15)`, // Primary-themed shadow (sakura[3])

    // Technical modal colors (fallback to sakura theme)
    backgroundModal: warmColors[0] ?? '#FDFCFB',
    borderModal: warmColors[2] ?? '#E8E8E8',
    borderEarth: earthColors[2] ?? '#D4A574',
    borderWarm: warmColors[2] ?? '#E8E8E8',
    borderPrimaryColor: primaryColors[1] ?? '#FFCDD2', // sakura[1]
  };
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `${r}, ${g}, ${b}`;
  }
  return '0, 0, 0';
}

// Helper function to get color with opacity
export function useWithOpacity(color: string, opacity: number): string {
  const rgb = hexToRgb(color);
  return `rgba(${rgb}, ${opacity})`;
}

// Helper function to get theme color by name and shade
export function useThemeColor(colorName: string, shade: number = 3): string {
  const theme = useCurrentTheme();
  const colors = theme.colors?.[colorName as keyof typeof theme.colors] as readonly string[];
  return colors?.[shade] ?? '#000000';
}
