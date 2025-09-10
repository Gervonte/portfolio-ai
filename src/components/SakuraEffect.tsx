'use client';

import { useEffect, useRef } from 'react';

interface SakuraEffectProps {
  className?: string;
  petalCount?: number;
  petalSize?: number;
  fallSpeed?: number;
  windSpeed?: number;
  colors?: string[];
}

export default function SakuraEffect({
  className = '',
  petalCount = 15,
  petalSize = 15,
  fallSpeed = 0.5,
  windSpeed = 0.5,
  colors = ['#FFCDD2', '#FFEBEE', '#EF9A9A', '#F44336'],
}: SakuraEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load sakura-js as a script since it doesn't have proper ES module support
    const loadSakura = async () => {
      if (!(window as any).Sakura) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = '/js/sakura-fixed.js';
          script.onload = () => {
            // Wait a bit more to ensure the library is fully loaded
            setTimeout(resolve, 100);
          };
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      const Sakura = (window as any).Sakura;
      if (!Sakura || typeof Sakura !== 'function') {
        throw new Error('Sakura library not loaded properly');
      }
      return Sakura;
    };

    loadSakura().then(Sakura => {
      if (containerRef.current) {
        // Clear any existing sakura instances
        const existingSakura =
          containerRef.current.querySelector('.sakura-container');
        if (existingSakura) {
          existingSakura.remove();
        }

        // Create sakura container with unique ID
        const sakuraContainer = document.createElement('div');
        const containerId = `sakura-effect-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sakuraContainer.id = containerId;
        sakuraContainer.className = 'sakura-container';
        sakuraContainer.style.position = 'absolute';
        sakuraContainer.style.top = '0';
        sakuraContainer.style.left = '0';
        sakuraContainer.style.width = '100%';
        sakuraContainer.style.height = '100%';
        sakuraContainer.style.pointerEvents = 'none';
        sakuraContainer.style.zIndex = '1';
        sakuraContainer.style.overflow = 'hidden';

        containerRef.current.appendChild(sakuraContainer);

        // Wait for the element to be in the DOM before initializing sakura
        let sakuraInstance: any = null;
        setTimeout(() => {
          const element = document.getElementById(containerId);
          if (element) {
            try {
              // Initialize sakura with custom options - it expects a CSS selector string
              sakuraInstance = Sakura(`#${containerId}`, {
                fallSpeed: fallSpeed,
                maxSize: petalSize + 5,
                minSize: petalSize - 5,
                delay: 300,
                colors: colors.map(color => ({
                  gradientColorStart: color,
                  gradientColorEnd: color,
                  gradientColorDegree: 120,
                })),
              });
            } catch (error) {
              console.error('Failed to initialize sakura:', error);
            }
          }
        }, 0);

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
    });

    return () => {
      // Cleanup on unmount
      if (containerRef.current) {
        const sakuraContainer =
          containerRef.current.querySelector('.sakura-container');
        if (sakuraContainer) {
          sakuraContainer.remove();
        }
      }
    };
  }, [petalCount, petalSize, fallSpeed, windSpeed, colors]);

  return (
    <div
      ref={containerRef}
      className={`sakura-effect ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
