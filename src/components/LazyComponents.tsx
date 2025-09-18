'use client';

import dynamic from 'next/dynamic';
import OptimizedLoadingSpinner from './OptimizedLoadingSpinner';

// Lazy load all heavy components with optimized loading states
export const LazyAboutSection = dynamic(() => import('./AboutSection'), {
  loading: () => <OptimizedLoadingSpinner aria-label="Loading about section" count={3} />,
  ssr: false,
});

export const LazyWorkSection = dynamic(() => import('./WorkSection'), {
  loading: () => <OptimizedLoadingSpinner aria-label="Loading work section" count={4} />,
  ssr: false,
});

export const LazyExperienceSection = dynamic(() => import('./ExperienceSection'), {
  loading: () => <OptimizedLoadingSpinner aria-label="Loading experience section" count={2} />,
  ssr: false,
});

export const LazyContactSection = dynamic(() => import('./ContactSection'), {
  loading: () => <OptimizedLoadingSpinner aria-label="Loading contact section" count={1} />,
  ssr: false,
});

export const LazyScrollIndicator = dynamic(() => import('./ScrollIndicator'), {
  loading: () => <div style={{ height: '60px' }} />, // Minimal loading state
  ssr: false,
});

export const LazyTechnicalDetailsModal = dynamic(
  () => import('./TechnicalDetailsModal').then(mod => ({ default: mod.TechnicalDetailsModal })),
  {
    loading: () => <OptimizedLoadingSpinner height={200} aria-label="Loading technical details" />,
    ssr: false,
  }
);
