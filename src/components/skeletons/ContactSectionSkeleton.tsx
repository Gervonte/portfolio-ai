'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Container, Grid, Group, Stack } from '@mantine/core';
import { memo } from 'react';
import BaseSkeleton from './BaseSkeleton';

const ContactSectionSkeleton = memo(() => {
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

        <Grid>
          {/* Contact Form */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Box
              p="xl"
              style={{
                border: `1px solid ${commonColors.borderPrimary}`,
                borderRadius: '16px',
                boxShadow: commonColors.shadowCard,
              }}
            >
              <Stack gap="lg">
                <Box mb="md">
                  <BaseSkeleton height={32} width={200} radius="md" />
                </Box>

                {/* Form Fields */}
                <Stack gap="md">
                  {/* Name and Email Row */}
                  <Group grow>
                    <Stack gap="xs">
                      <BaseSkeleton height={16} width={60} radius="sm" />
                      <BaseSkeleton height={40} width="100%" radius="md" />
                    </Stack>
                    <Stack gap="xs">
                      <BaseSkeleton height={16} width={60} radius="sm" />
                      <BaseSkeleton height={40} width="100%" radius="md" />
                    </Stack>
                  </Group>

                  {/* Subject Field */}
                  <Stack gap="xs">
                    <BaseSkeleton height={16} width={60} radius="sm" />
                    <BaseSkeleton height={40} width="100%" radius="md" />
                  </Stack>

                  {/* Message Field */}
                  <Stack gap="xs">
                    <BaseSkeleton height={16} width={80} radius="sm" />
                    <BaseSkeleton height={120} width="100%" radius="md" />
                  </Stack>

                  {/* Submit Button */}
                  <Group justify="flex-end" mt="md">
                    <BaseSkeleton height={40} width={120} radius="md" />
                  </Group>
                </Stack>
              </Stack>
            </Box>
          </Grid.Col>

          {/* Contact Info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              {/* Contact Methods */}
              <Box
                p="lg"
                style={{
                  border: `1px solid ${commonColors.borderPrimary}`,
                  borderRadius: '12px',
                }}
              >
                <Box mb="md">
                  <BaseSkeleton height={24} width={150} radius="md" />
                </Box>
                <Stack gap="md">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <Group key={index} gap="md">
                      <BaseSkeleton height={20} width={20} variant="circular" />
                      <Stack gap="xs" style={{ flex: 1 }}>
                        <BaseSkeleton height={16} width="80%" radius="sm" />
                        <BaseSkeleton height={14} width="60%" radius="sm" />
                      </Stack>
                    </Group>
                  ))}
                </Stack>
              </Box>

              {/* Social Links */}
              <Box
                p="lg"
                style={{
                  border: `1px solid ${commonColors.borderPrimary}`,
                  borderRadius: '12px',
                }}
              >
                <Box mb="md">
                  <BaseSkeleton height={24} width={120} radius="md" />
                </Box>
                <Group gap="md">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <BaseSkeleton key={index} height={40} width={40} variant="circular" />
                  ))}
                </Group>
              </Box>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
});

ContactSectionSkeleton.displayName = 'ContactSectionSkeleton';

export default ContactSectionSkeleton;
