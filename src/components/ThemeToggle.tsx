'use client';

import { useIsHydrated, useTheme } from '@/lib/theme-context';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconDroplet, IconPalette } from '@tabler/icons-react';
import { useState } from 'react';

export default function ThemeToggle() {
  const { currentTheme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const isHydrated = useIsHydrated();

  // Don't render until hydrated to prevent mismatch
  if (!isHydrated) {
    return (
      <ActionIcon
        variant="subtle"
        size="lg"
        style={{
          minHeight: '44px',
          minWidth: '44px',
        }}
        aria-label="Theme toggle"
      >
        <IconPalette size={20} />
      </ActionIcon>
    );
  }

  const isSakura = currentTheme === 'sakura';
  const Icon = isSakura ? IconDroplet : IconPalette;

  return (
    <Tooltip
      label={isSakura ? 'Switch to Ocean Theme' : 'Switch to Sakura Theme'}
      position="bottom"
      withArrow
    >
      <ActionIcon
        variant="subtle"
        size="lg"
        onClick={toggleTheme}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: 'all 0.2s ease-in-out',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
        aria-label={`Switch to ${isSakura ? 'Ocean' : 'Sakura'} theme`}
      >
        <Icon
          size={20}
          style={{
            transition: 'all 0.2s ease-in-out',
            transform: isHovered ? 'rotate(15deg)' : 'rotate(0deg)',
          }}
        />
      </ActionIcon>
    </Tooltip>
  );
}
