'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Container, Grid, Group, SimpleGrid, Stack } from '@mantine/core';
import { memo } from 'react';
import BaseSkeleton from './BaseSkeleton';

const AboutSectionSkeleton = memo(() => {
  const commonColors = useCommonColors();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Hero Section */}
        <Box ta="center" mb="xl">
          <Group justify="center" mb="md">
            <BaseSkeleton height={32} width={180} radius="xl" />
          </Group>
          <BaseSkeleton height={48} width={300} radius="md" className="skeleton-title" />
          <Box mt="md" mx="auto" maw={800}>
            <BaseSkeleton height={24} width="100%" radius="md" />
            <Box mt="xs">
              <BaseSkeleton height={24} width="85%" radius="md" />
            </Box>
            <Box mt="xs">
              <BaseSkeleton height={24} width="70%" radius="md" />
            </Box>
          </Box>
        </Box>

        {/* Skills Section */}
        <Box>
          <Box mb="lg">
            <BaseSkeleton height={32} width={200} radius="md" />
          </Box>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
            {Array.from({ length: 6 }).map((_, index) => (
              <Box
                key={index}
                p="md"
                style={{ border: `1px solid ${commonColors.borderPrimary}`, borderRadius: '12px' }}
              >
                <Box mb="sm">
                  <Group>
                    <BaseSkeleton height={20} width={20} variant="circular" />
                    <BaseSkeleton height={20} width={120} radius="md" />
                  </Group>
                </Box>
                <Stack gap="xs">
                  {Array.from({ length: 3 }).map((_, skillIndex) => (
                    <Group key={skillIndex} justify="space-between">
                      <BaseSkeleton height={16} width={80} radius="sm" />
                      <BaseSkeleton height={16} width={60} radius="sm" />
                    </Group>
                  ))}
                </Stack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Research Projects & Leadership Grid */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              p="md"
              style={{ border: `1px solid ${commonColors.borderPrimary}`, borderRadius: '12px' }}
            >
              <Box mb="md">
                <BaseSkeleton height={24} width={180} radius="md" />
              </Box>
              <Stack gap="md">
                {Array.from({ length: 2 }).map((_, index) => (
                  <Box key={index}>
                    <BaseSkeleton height={20} width="100%" radius="md" />
                    <Box mt="xs">
                      <BaseSkeleton height={16} width="80%" radius="sm" />
                    </Box>
                    <Box mt="xs">
                      <BaseSkeleton height={16} width="60%" radius="sm" />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box
              p="md"
              style={{ border: `1px solid ${commonColors.borderPrimary}`, borderRadius: '12px' }}
            >
              <Box mb="md">
                <BaseSkeleton height={24} width={150} radius="md" />
              </Box>
              <Stack gap="md">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Box key={index}>
                    <BaseSkeleton height={18} width="100%" radius="md" />
                    <Box mt="xs">
                      <BaseSkeleton height={14} width="70%" radius="sm" />
                    </Box>
                    <Box mt="xs">
                      <BaseSkeleton height={14} width="50%" radius="sm" />
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
});

AboutSectionSkeleton.displayName = 'AboutSectionSkeleton';

export default AboutSectionSkeleton;
