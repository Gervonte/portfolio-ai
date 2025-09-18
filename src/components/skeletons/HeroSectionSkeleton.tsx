'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Container, Group, Stack } from '@mantine/core';
import { memo } from 'react';
import BaseSkeleton from './BaseSkeleton';

const HeroSectionSkeleton = memo(() => {
  const commonColors = useCommonColors();

  return (
    <Box
      id="hero"
      role="banner"
      aria-label="Hero section loading"
      style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: commonColors.backgroundPrimary,
      }}
    >
      <Container size="lg" py="xl">
        <Stack align="center" gap="xl">
          {/* Main Title */}
          <Box
            ta="center"
            mb="md"
            style={{
              fontSize: 'clamp(3.5rem, 6vw, 5rem)',
              margin: '0 auto',
            }}
          >
            <BaseSkeleton height={80} width={600} radius="md" className="skeleton-title" />
          </Box>

          {/* Subtitle */}
          <Box ta="center" mb="xl" mx="auto" maw={850}>
            <BaseSkeleton height={32} width="100%" radius="md" />
            <Box mt="xs">
              <BaseSkeleton height={32} width="90%" radius="md" />
            </Box>
          </Box>

          {/* CTA Buttons */}
          <Group justify="center" gap="md">
            <BaseSkeleton height={48} width={140} radius="md" />
            <BaseSkeleton height={48} width={140} radius="md" />
          </Group>
        </Stack>
      </Container>
    </Box>
  );
});

HeroSectionSkeleton.displayName = 'HeroSectionSkeleton';

export default HeroSectionSkeleton;
