'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Container, Group, Stack } from '@mantine/core';
import { memo } from 'react';
import BaseSkeleton from './BaseSkeleton';

const ExperienceSectionSkeleton = memo(() => {
  const commonColors = useCommonColors();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box ta="center" mb="xl">
          <BaseSkeleton height={48} width={400} radius="md" className="skeleton-title" />
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
            {/* Company Header */}
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs" style={{ flex: 1 }}>
                <BaseSkeleton height={28} width="60%" radius="md" />
                <BaseSkeleton height={20} width="40%" radius="sm" />
                <BaseSkeleton height={18} width="30%" radius="sm" />
              </Stack>
              <BaseSkeleton height={32} width={100} radius="xl" />
            </Group>

            {/* Description */}
            <Stack gap="xs">
              <BaseSkeleton height={16} width="100%" radius="sm" />
              <BaseSkeleton height={16} width="95%" radius="sm" />
              <BaseSkeleton height={16} width="85%" radius="sm" />
            </Stack>

            {/* Technologies */}
            <Box>
              <Box mb="sm">
                <BaseSkeleton height={16} width={120} radius="sm" />
              </Box>
              <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Array.from({ length: 6 }).map((_, techIndex) => (
                  <BaseSkeleton key={techIndex} height={24} width={70} radius="xl" />
                ))}
              </Box>
            </Box>

            {/* Achievements */}
            <Box>
              <Box mb="sm">
                <BaseSkeleton height={16} width={140} radius="sm" />
              </Box>
              <Stack gap="xs">
                {Array.from({ length: 4 }).map((_, achievementIndex) => (
                  <Group key={achievementIndex} gap="sm">
                    <BaseSkeleton height={4} width={4} variant="circular" />
                    <BaseSkeleton height={16} width="90%" radius="sm" />
                  </Group>
                ))}
              </Stack>
            </Box>

            {/* Timeline Badge */}
            <Group justify="center" mt="md">
              <BaseSkeleton height={24} width={150} radius="xl" />
            </Group>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
});

ExperienceSectionSkeleton.displayName = 'ExperienceSectionSkeleton';

export default ExperienceSectionSkeleton;
