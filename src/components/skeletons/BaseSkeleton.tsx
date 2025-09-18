'use client';

import { useColorCombinations } from '@/lib/theme-aware-colors';
import { Skeleton } from '@mantine/core';
import { memo } from 'react';

interface BaseSkeletonProps {
  height?: number | string;
  width?: number | string;
  radius?: string;
  className?: string;
  animated?: boolean;
  variant?: 'text' | 'rectangular' | 'circular' | 'rounded';
}

const BaseSkeleton = memo(
  ({
    height = 20,
    width = '100%',
    radius = 'md',
    className = '',
    animated = true,
    variant = 'rectangular',
  }: BaseSkeletonProps) => {
    const colorCombinations = useColorCombinations();

    const getVariantStyles = () => {
      switch (variant) {
        case 'circular':
          return {
            borderRadius: '50%',
            width: height,
            height: height,
          };
        case 'rounded':
          return {
            borderRadius: radius,
          };
        case 'text':
          return {
            borderRadius: '4px',
            height: '1em',
            width: '100%',
          };
        default:
          return {
            borderRadius: radius,
          };
      }
    };

    return (
      <Skeleton
        height={height}
        width={width}
        radius={radius}
        className={className}
        animate={animated}
        style={{
          ...getVariantStyles(),
          background: colorCombinations.skeletonGradient,
          backgroundSize: '200% 100%',
          animation: animated ? 'skeleton-shimmer 1.5s infinite ease-in-out' : 'none',
        }}
      />
    );
  }
);

BaseSkeleton.displayName = 'BaseSkeleton';

export default BaseSkeleton;
