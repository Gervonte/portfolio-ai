'use client';

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
              background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
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
              background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
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
