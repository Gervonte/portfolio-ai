'use client';

import { Button } from '@mantine/core';
import { IconSettings } from '@tabler/icons-react';
import { memo } from 'react';
import { TechnicalDetailsButtonProps } from '../types';

const TechnicalDetailsButton = memo(({ onTechnicalDetailsClick }: TechnicalDetailsButtonProps) => {
  return (
    <Button
      variant="light"
      color="sakura"
      size="sm"
      fullWidth
      leftSection={<IconSettings size={16} />}
      onClick={onTechnicalDetailsClick}
      mb="sm"
      style={{
        fontWeight: 600,
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      View Technical Details
    </Button>
  );
});

TechnicalDetailsButton.displayName = 'TechnicalDetailsButton';

export default TechnicalDetailsButton;
