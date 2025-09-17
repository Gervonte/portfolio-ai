'use client';

import { getTheme, type ThemeName } from '@/lib/themes';
import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme storage key
const THEME_STORAGE_KEY = 'portfolio-theme';

// Get initial theme from localStorage or default
const getInitialTheme = (): ThemeName => {
  if (typeof window === 'undefined') {
    return 'sakura'; // Default for SSR
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored && (stored === 'sakura' || stored === 'ocean')) {
    return stored as ThemeName;
  }

  return 'sakura'; // Default theme
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('sakura'); // Always start with default
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
    const storedTheme = getInitialTheme();
    setCurrentTheme(storedTheme);
  }, []);

  // Update localStorage when theme changes (only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(THEME_STORAGE_KEY, currentTheme);
    }
  }, [currentTheme, isHydrated]);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  const toggleTheme = () => {
    setCurrentTheme(prev => (prev === 'sakura' ? 'ocean' : 'sakura'));
  };

  const value = {
    currentTheme,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Get current theme object
export function useCurrentTheme() {
  const { currentTheme } = useTheme();
  return getTheme(currentTheme);
}

// Hook to check if component is hydrated
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
