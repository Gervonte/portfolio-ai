import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    sakura: [
      '#FFEBEE', // sakura[0] - lightest red
      '#FFCDD2', // sakura[1] - light red
      '#EF9A9A', // sakura[2] - medium red
      '#F44336', // sakura[3] - deep red
      '#E53935', // sakura[4] - darker red
      '#D32F2F', // sakura[5] - darkest red
      '#C62828', // sakura[6] - very dark red
      '#B71C1C', // sakura[7] - ultra dark red
      '#8D1A1A', // sakura[8] - near black red
      '#4A0E0E', // sakura[9] - black red
    ],
    warm: [
      '#FDFCFB', // warm[0] - cream white
      '#F5F5F5', // warm[1] - light gray
      '#E8E8E8', // warm[2] - border gray
      '#999999', // warm[3] - muted text
      '#666666', // warm[4] - secondary text
      '#2C2C2C', // warm[5] - primary text
      '#1A1A1A', // warm[6] - near black
      '#1A1A1A', // warm[7] - duplicate for 10 elements
      '#1A1A1A', // warm[8] - duplicate for 10 elements
      '#1A1A1A', // warm[9] - duplicate for 10 elements
    ],
    earth: [
      '#FDF4E3', // earth[0] - light brown
      '#F4E4BC', // earth[1] - warm beige
      '#D4A574', // earth[2] - medium brown
      '#8B4513', // earth[3] - saddle brown
      '#654321', // earth[4] - dark brown
      '#654321', // earth[5] - duplicate for 10 elements
      '#654321', // earth[6] - duplicate for 10 elements
      '#654321', // earth[7] - duplicate for 10 elements
      '#654321', // earth[8] - duplicate for 10 elements
      '#654321', // earth[9] - duplicate for 10 elements
    ],
  },
  primaryColor: 'sakura',
  primaryShade: 3, // Use sakura[3] as primary
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Fira Code, Consolas, monospace',
  headings: {
    fontFamily: 'Inter, sans-serif',
    fontWeight: '600',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadows: {
    xs: '0 1px 3px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
  },
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
});
