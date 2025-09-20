'use client';

import { Box, Group, Text, ThemeIcon, Title } from '@mantine/core';
import { memo } from 'react';
import { ModalHeaderProps } from './types';
import { getTechnicalIcon } from './utils';

const ModalHeader = memo(({ project, activeTab, commonColors }: ModalHeaderProps) => {
  return (
    <Box>
      <Group gap="sm" align="flex-start" mb="lg" wrap="wrap">
        <ThemeIcon
          color={commonColors.accentPrimary}
          variant="light"
          size="xl"
          style={{
            cursor: 'default',
            flexShrink: 0,
            transition: 'all 0.2s ease-in-out',
            transform: 'scale(1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = `0 4px 12px ${commonColors.shadowMedium}`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {getTechnicalIcon(activeTab || 'analytics')}
        </ThemeIcon>
        <Box style={{ flex: 1, minWidth: '0', overflow: 'hidden' }}>
          <Title
            id="modal-title"
            order={1}
            c={commonColors.textPrimary}
            fw={800}
            mb="xs"
            size="h3"
            style={{
              fontSize: 'clamp(var(--mantine-font-size-lg), 4vw, var(--mantine-font-size-xl))',
              lineHeight: 1.2,
              wordBreak: 'break-word',
            }}
          >
            {project.title}
          </Title>
          <Text
            id="modal-description"
            size="sm"
            c={commonColors.textSecondary}
            fw={500}
            style={{
              fontSize: 'clamp(var(--mantine-font-size-xs), 3vw, var(--mantine-font-size-sm))',
              lineHeight: 1.3,
            }}
          >
            Technical Deep Dive & Behind the Scenes
          </Text>
        </Box>
      </Group>
    </Box>
  );
});

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;
