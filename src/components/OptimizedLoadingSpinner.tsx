'use client';

import { useWarmColors } from '@/lib/theme-aware-colors';
import { Box, Skeleton } from '@mantine/core';
import { memo } from 'react';

interface OptimizedLoadingSpinnerProps {
  height?: number | string;
  width?: number | string;
  count?: number;
  className?: string;
  'aria-label'?: string;
}

const OptimizedLoadingSpinner = memo(
  ({
    height = 400,
    width = '100%',
    count = 1,
    className = '',
    'aria-label': ariaLabel = 'Loading content',
  }: OptimizedLoadingSpinnerProps) => {
    const warmColors = useWarmColors();
    return (
      <Box
        className={`loading-placeholder ${className}`}
        role="status"
        aria-label={ariaLabel}
        style={{
          minHeight: height,
          width,
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '2rem',
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <Skeleton
            key={index}
            height={60}
            radius="md"
            style={{
              background: `linear-gradient(90deg, ${warmColors[1] ?? '#F5F5F5'} 25%, ${warmColors[2] ?? '#E8E8E8'} 50%, ${warmColors[1] ?? '#F5F5F5'} 75%)`,
              backgroundSize: '200% 100%',
              animation: 'loading 1.5s infinite',
            }}
          />
        ))}
        <style jsx>{`
          @keyframes loading {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }

          @media (prefers-color-scheme: dark) {
            .loading-placeholder :global(.mantine-Skeleton-root) {
              background: linear-gradient(
                90deg,
                ${warmColors[6] ?? '#1A1A1A'} 25%,
                ${warmColors[5] ?? '#2C2C2C'} 50%,
                ${warmColors[6] ?? '#1A1A1A'} 75%
              );
              background-size: 200% 100%;
            }
          }
        `}</style>
      </Box>
    );
  }
);

OptimizedLoadingSpinner.displayName = 'OptimizedLoadingSpinner';

export default OptimizedLoadingSpinner;
