'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Container, Group, SimpleGrid, Stack } from '@mantine/core';
import { memo } from 'react';
import BaseSkeleton from './BaseSkeleton';

const WorkSectionSkeleton = memo(() => {
  const commonColors = useCommonColors();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box ta="center" mb="xl">
          <BaseSkeleton height={48} width={300} radius="md" className="skeleton-title" />
          <Box mt="md" mx="auto" maw={800}>
            <BaseSkeleton height={24} width="100%" radius="md" />
            <Box mt="xs">
              <BaseSkeleton height={24} width="85%" radius="md" />
            </Box>
          </Box>
        </Box>

        {/* Project Cards Grid */}
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {Array.from({ length: 6 }).map((_, index) => (
            <Box
              key={index}
              p="md"
              style={{
                border: `1px solid ${commonColors.borderPrimary}`,
                borderRadius: '16px',
                boxShadow: commonColors.shadowCard,
              }}
            >
              {/* Project Image */}
              <Box mb="md">
                <BaseSkeleton height={200} width="100%" radius="md" />
              </Box>

              {/* Project Header */}
              <Stack gap="sm" mb="md">
                <Group justify="space-between" align="flex-start">
                  <BaseSkeleton height={24} width="70%" radius="md" />
                  <BaseSkeleton height={24} width={60} radius="xl" />
                </Group>
                <BaseSkeleton height={20} width="50%" radius="sm" />
              </Stack>

              {/* Project Description */}
              <Stack gap="xs" mb="md">
                <BaseSkeleton height={16} width="100%" radius="sm" />
                <BaseSkeleton height={16} width="90%" radius="sm" />
                <BaseSkeleton height={16} width="75%" radius="sm" />
              </Stack>

              {/* Tech Stack */}
              <Box mb="md">
                <Box mb="sm">
                  <BaseSkeleton height={16} width={100} radius="sm" />
                </Box>
                <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {Array.from({ length: 4 }).map((_, techIndex) => (
                    <BaseSkeleton key={techIndex} height={24} width={60} radius="xl" />
                  ))}
                </Box>
              </Box>

              {/* Action Buttons */}
              <Group justify="space-between">
                <BaseSkeleton height={36} width={100} radius="md" />
                <BaseSkeleton height={36} width={100} radius="md" />
              </Group>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
});

WorkSectionSkeleton.displayName = 'WorkSectionSkeleton';

export default WorkSectionSkeleton;
