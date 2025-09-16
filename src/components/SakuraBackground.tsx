'use client';

import { Box } from '@mantine/core';
import { useCallback, useEffect, useRef, useState } from 'react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Configuration based on intensity and variant
  const getConfig = useCallback(() => {
    const baseConfig = {
      subtle: { petalSize: 12, fallSpeed: 0.3, delay: 500 },
      moderate: { petalSize: 15, fallSpeed: 0.5, delay: 300 },
      intense: { petalSize: 18, fallSpeed: 0.8, delay: 200 },
    };

    const variantConfig = {
      falling: { colors: ['#FFCDD2', '#FFEBEE', '#EF9A9A', '#F44336'] },
      floating: { colors: ['#FFEBEE', '#FFCDD2', '#EF9A9A'] },
      gentle: { colors: ['#FFEBEE', '#FFCDD2'] },
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

    const initSakura = async () => {
      try {
        // Load sakura-js as a script since it doesn't have proper ES module support
        if (!(window as { Sakura?: unknown }).Sakura) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = '/js/sakura-fixed.js';
            script.onload = () => {
              console.log('Script loaded, checking for Sakura...');
              console.log('window.Sakura:', (window as { Sakura?: unknown }).Sakura);
              console.log('typeof window.Sakura:', typeof (window as { Sakura?: unknown }).Sakura);
              // Wait a bit more to ensure the library is fully loaded
              setTimeout(() => {
                console.log(
                  'After timeout - window.Sakura:',
                  (window as { Sakura?: unknown }).Sakura
                );
                resolve(undefined);
              }, 200);
            };
            script.onerror = error => {
              console.error('Failed to load sakura script:', error);
              reject(error);
            };
            document.head.appendChild(script);
          });
        }

        const Sakura = (window as { Sakura?: unknown }).Sakura;
        console.log('Sakura loaded:', typeof Sakura, Sakura);
        console.log(
          'Window object keys:',
          Object.keys(window).filter(key => key.toLowerCase().includes('sakura'))
        );
        if (!Sakura || typeof Sakura !== 'function') {
          throw new Error(
            `Sakura library not loaded properly. Type: ${typeof Sakura}, Value: ${Sakura}`
          );
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

          // Wait for the element to be in the DOM before initializing sakura
          let sakuraInstance: { destroy?: () => void } | null = null;
          setTimeout(() => {
            const element = document.getElementById(containerId);
            if (element) {
              try {
                // Initialize sakura - it expects a CSS selector string
                sakuraInstance = Sakura(`#${containerId}`, config);
              } catch (error) {
                console.error('Failed to initialize sakura:', error);
              }
            }
          }, 0);
          setIsLoaded(true);

          // Cleanup function
          return () => {
            if (sakuraInstance && typeof sakuraInstance.destroy === 'function') {
              sakuraInstance.destroy();
            }
            if (sakuraContainer.parentNode) {
              sakuraContainer.parentNode.removeChild(sakuraContainer);
            }
          };
        }
      } catch (error) {
        console.warn('Failed to load sakura effect:', error);
      }
    };

    initSakura();

    return () => {
      const currentContainer = containerRef.current;
      if (currentContainer) {
        const sakuraContainer = currentContainer.querySelector('.sakura-container');
        if (sakuraContainer) {
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
      }}
    >
      {children}
      {!isLoaded && (
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0.3,
            fontSize: '14px',
            color: '#F8BBD9',
          }}
        >
          Loading sakura effect...
        </Box>
      )}
    </Box>
  );
}
