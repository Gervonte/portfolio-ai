'use client';

import { Image, ImageProps } from '@mantine/core';
import { memo } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'alt'> {
  priority?: boolean;
  alt?: string;
}

const OptimizedImage = memo<OptimizedImageProps>(({ priority = false, alt, ...props }) => {
  return <Image {...props} loading={priority ? 'eager' : 'lazy'} alt={alt || ''} />;
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
