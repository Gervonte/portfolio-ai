'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Container, Stack } from '@mantine/core';
import { memo } from 'react';
import BaseSkeleton from './BaseSkeleton';

const ExperienceSectionSkeleton = memo(() => {
  const commonColors = useCommonColors();

  return (
    <Container size="lg">
      <Stack gap="xl">
        {/* Header */}
        <Box ta="center" mb="xl">
          <BaseSkeleton height={48} width={300} radius="md" className="skeleton-title" />
          <Box mt="md" mx="auto" maw={800}>
            <BaseSkeleton height={24} width="100%" radius="md" />
            <Box mt="xs">
              <BaseSkeleton height={24} width="90%" radius="md" />
            </Box>
          </Box>
        </Box>

        {/* Experience Card */}
        <Box
          p="xl"
          style={{
            border: `1px solid ${commonColors.borderPrimary}`,
            borderRadius: '16px',
            boxShadow: commonColors.shadowCard,
          }}
        >
          <Stack gap="lg">
            <BaseSkeleton height={24} width="60%" radius="md" />
            <BaseSkeleton height={18} width="40%" radius="sm" />
            <BaseSkeleton height={16} width="100%" radius="sm" />
            <BaseSkeleton height={16} width="90%" radius="sm" />
            <Box style={{ display: 'flex', gap: '8px' }}>
              <BaseSkeleton height={24} width={60} radius="xl" />
              <BaseSkeleton height={24} width={60} radius="xl" />
              <BaseSkeleton height={24} width={60} radius="xl" />
            </Box>
            <BaseSkeleton height={16} width="80%" radius="sm" />
            <BaseSkeleton height={16} width="70%" radius="sm" />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
});

ExperienceSectionSkeleton.displayName = 'ExperienceSectionSkeleton';

export default ExperienceSectionSkeleton;
