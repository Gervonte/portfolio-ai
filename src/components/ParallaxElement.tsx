'use client';

import { useEffect, useRef } from 'react';
import { Box } from '@mantine/core';
import { useParallax } from '@/lib/parallax-context';

type RellaxInstance =
  | {
      destroy: () => void;
      refresh: () => void;
      start: () => void;
      stop: () => void;
      burst?: () => void;
    }
  | any;

interface ParallaxElementProps {
  speed?: number;
  center?: boolean;
  horizontal?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function ParallaxElement({
  speed = -2,
  center = false,
  horizontal = false,
  className = '',
  children,
  style = {},
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<RellaxInstance | null>(null);
  const { createRellaxInstance, destroyRellaxInstance, isReducedMotion, globalSpeedMultiplier } =
    useParallax();

  useEffect(() => {
    if (!elementRef.current || isReducedMotion) {
      return;
    }

    // Clean up existing instance
    if (instanceRef.current) {
      destroyRellaxInstance(instanceRef.current);
      instanceRef.current = null;
    }

    // Wait a bit for the element to be fully rendered
    const timer = setTimeout(() => {
      console.log(
        'ParallaxElement: Creating Rellax instance with speed:',
        speed,
        'multiplier:',
        globalSpeedMultiplier,
        'center:',
        center,
        'horizontal:',
        horizontal
      );
      const instance = createRellaxInstance(elementRef.current!, speed, {
        center,
        horizontal,
      });

      if (instance) {
        instanceRef.current = instance;
        console.log('ParallaxElement: Rellax instance created successfully');
      } else {
        console.log('ParallaxElement: Failed to create Rellax instance');
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      if (instanceRef.current) {
        destroyRellaxInstance(instanceRef.current);
        instanceRef.current = null;
      }
    };
  }, [
    speed,
    center,
    horizontal,
    createRellaxInstance,
    destroyRellaxInstance,
    isReducedMotion,
    globalSpeedMultiplier,
  ]);

  return (
    <Box ref={elementRef} className={className} style={style}>
      {children}
    </Box>
  );
}
