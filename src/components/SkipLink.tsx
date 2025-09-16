'use client';

import { commonColors } from '@/lib/colors';
import { useState } from 'react';

export default function SkipLink() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <a
      href="#about"
      style={{
        position: 'absolute',
        top: isVisible ? '6px' : '-40px',
        left: '6px',
        background: commonColors.accentPrimary,
        color: 'white',
        padding: '8px',
        textDecoration: 'none',
        borderRadius: '4px',
        zIndex: 10000,
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'top 0.2s ease',
      }}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      Skip to main content
    </a>
  );
}
