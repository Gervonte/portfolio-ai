'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Container, SimpleGrid, Stack } from '@mantine/core';
import { memo } from 'react';
import BaseSkeleton from './BaseSkeleton';

const ContactSectionSkeleton = memo(() => {
  const commonColors = useCommonColors();

  return (
    <Container size="lg">
      <Stack gap="xl">
        {/* Header */}
        <Box ta="center" mb="xl">
          <BaseSkeleton height={48} width={200} radius="md" className="skeleton-title" />
          <Box mt="md" mx="auto" maw={800}>
            <BaseSkeleton height={24} width="100%" radius="md" />
            <Box mt="xs">
              <BaseSkeleton height={24} width="90%" radius="md" />
            </Box>
          </Box>
        </Box>

        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
          {/* Contact Information */}
          <Stack gap="lg">
            <BaseSkeleton height={32} width={150} radius="md" />
            <Stack gap="md">
              {Array.from({ length: 4 }).map((_, index) => (
                <Box
                  key={index}
                  p="md"
                  style={{
                    border: `1px solid ${commonColors.borderPrimary}`,
                    borderRadius: '12px',
                    boxShadow: commonColors.shadowCard,
                  }}
                >
                  <BaseSkeleton height={60} width="100%" radius="md" />
                </Box>
              ))}
            </Stack>
          </Stack>

          {/* Contact Form */}
          <Stack gap="lg">
            <BaseSkeleton height={32} width={200} radius="md" />
            <Box
              p="xl"
              style={{
                border: `1px solid ${commonColors.borderPrimary}`,
                borderRadius: '12px',
                boxShadow: commonColors.shadowCard,
              }}
            >
              <Stack gap="md">
                <SimpleGrid cols={2} spacing="md">
                  <BaseSkeleton height={40} width="100%" radius="md" />
                  <BaseSkeleton height={40} width="100%" radius="md" />
                </SimpleGrid>
                <BaseSkeleton height={40} width="100%" radius="md" />
                <BaseSkeleton height={120} width="100%" radius="md" />
                <BaseSkeleton height={48} width="100%" radius="md" />
              </Stack>
            </Box>
          </Stack>
        </SimpleGrid>
      </Stack>
    </Container>
  );
});

ContactSectionSkeleton.displayName = 'ContactSectionSkeleton';

export default ContactSectionSkeleton;
