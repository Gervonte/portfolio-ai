'use client';

import { usePrimaryColors } from '@/lib/theme-aware-colors';
import { Box } from '@mantine/core';
import { useCallback, useEffect, useRef } from 'react';

interface SakuraBackgroundProps {
  intensity?: 'subtle' | 'moderate' | 'intense';
  variant?: 'falling' | 'floating' | 'gentle';
  className?: string;
  children?: React.ReactNode;
}

export default function SakuraBackground({
  intensity = 'moderate',
  variant = 'falling',
  className = '',
  children,
}: SakuraBackgroundProps) {
  const primaryColors = usePrimaryColors();
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration based on intensity and variant
  const getConfig = useCallback(() => {
    const baseConfig = {
      subtle: { petalSize: 12, fallSpeed: 0.3, delay: 500 },
      moderate: { petalSize: 15, fallSpeed: 0.5, delay: 300 },
      intense: { petalSize: 18, fallSpeed: 0.8, delay: 200 },
    };

    const variantConfig = {
      falling: {
        colors: [
          primaryColors[1] ?? '#FFCDD2',
          primaryColors[0] ?? '#FFEBEE',
          primaryColors[2] ?? '#EF9A9A',
          primaryColors[3] ?? '#F44336',
        ],
      },
      floating: {
        colors: [
          primaryColors[0] ?? '#FFEBEE',
          primaryColors[1] ?? '#FFCDD2',
          primaryColors[2] ?? '#EF9A9A',
        ],
      },
      gentle: {
        colors: [primaryColors[0] ?? '#FFEBEE', primaryColors[1] ?? '#FFCDD2'],
      },
    };

    const config = {
      ...baseConfig[intensity],
      ...variantConfig[variant],
    };

    return {
      fallSpeed: config.fallSpeed,
      maxSize: config.petalSize + 5,
      minSize: config.petalSize - 5,
      delay: config.delay,
      colors: config.colors.map(color => ({
        gradientColorStart: color,
        gradientColorEnd: color,
        gradientColorDegree: 120,
      })),
    };
  }, [intensity, variant]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Use requestIdleCallback for better performance, fallback to setTimeout
    const scheduleInit = (callback: () => void) => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(callback, { timeout: 200 });
      } else {
        setTimeout(callback, 100);
      }
    };

    scheduleInit(() => {
      const initSakura = async () => {
        try {
          // Load sakura-js as a script since it doesn't have proper ES module support
          if (!(window as { Sakura?: unknown }).Sakura) {
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = '/js/sakura-fixed.js';
              script.async = true; // Make script loading non-blocking
              script.onload = () => {
                // Use requestIdleCallback for initialization
                if ('requestIdleCallback' in window) {
                  requestIdleCallback(() => resolve(undefined), { timeout: 200 });
                } else {
                  setTimeout(() => resolve(undefined), 100);
                }
              };
              script.onerror = error => {
                console.error('Failed to load sakura script:', error);
                reject(error);
              };
              document.head.appendChild(script);
            });
          }

          const Sakura = (window as { Sakura?: unknown }).Sakura;
          if (!Sakura || typeof Sakura !== 'function') {
            throw new Error('Sakura library not loaded properly');
          }

          const config = getConfig();

          if (containerRef.current) {
            // Clear existing sakura
            const existingSakura = containerRef.current.querySelector('.sakura-container');
            if (existingSakura) {
              existingSakura.remove();
            }

            // Create sakura container with unique ID
            const sakuraContainer = document.createElement('div');
            const containerId = `sakura-container-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            sakuraContainer.id = containerId;
            sakuraContainer.className = 'sakura-container';
            sakuraContainer.style.cssText = `
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none;
              z-index: 1;
              overflow: hidden;
            `;

            containerRef.current.appendChild(sakuraContainer);

            // Use requestIdleCallback for sakura initialization
            const initSakuraEffect = () => {
              const element = document.getElementById(containerId);
              if (element) {
                try {
                  // Initialize sakura - it expects a CSS selector string
                  const sakuraInstance = Sakura(`#${containerId}`, config);

                  // Store instance for cleanup
                  (sakuraContainer as HTMLElement & { sakuraInstance?: unknown }).sakuraInstance =
                    sakuraInstance;
                } catch (error) {
                  console.error('Failed to initialize sakura:', error);
                }
              }
            };

            if ('requestIdleCallback' in window) {
              requestIdleCallback(initSakuraEffect, { timeout: 200 });
            } else {
              setTimeout(initSakuraEffect, 0);
            }
          }
        } catch (error) {
          console.warn('Failed to load sakura effect:', error);
        }
      };

      initSakura();
    });

    return () => {
      const currentContainer = containerRef.current;
      if (currentContainer) {
        const sakuraContainer = currentContainer.querySelector(
          '.sakura-container'
        ) as HTMLElement & { sakuraInstance?: { destroy?: () => void } };
        if (sakuraContainer) {
          // Cleanup sakura instance
          if (
            sakuraContainer.sakuraInstance &&
            typeof sakuraContainer.sakuraInstance.destroy === 'function'
          ) {
            sakuraContainer.sakuraInstance.destroy();
          }
          sakuraContainer.remove();
        }
      }
    };
  }, [intensity, variant, getConfig]);

  return (
    <Box
      ref={containerRef}
      className={`sakura-background ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        overflow: 'hidden', // Prevent layout shifts
      }}
    >
      {children}
    </Box>
  );
}
