'use client';

import { Box, Card, Group, Image, SimpleGrid, ThemeIcon, Title } from '@mantine/core';
import { IconPhoto, IconZoomIn } from '@tabler/icons-react';
import { memo } from 'react';
import { MobileTooltip } from '../MobileTooltip';
import { ScreenshotGalleryProps } from './types';

const ScreenshotGallery = memo(
  ({ screenshots, sectionKey, commonColors, onImageSelect }: ScreenshotGalleryProps) => {
    if (!screenshots || screenshots.length === 0) {
      return null;
    }

    return (
      <Card
        padding="xl"
        radius="md"
        style={{
          background: commonColors.backgroundCard,
          boxShadow: `0 2px 8px ${commonColors.shadowLight}`,
          transition: 'all 0.2s ease-in-out',
          transform: 'scale(1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = `0 4px 16px ${commonColors.shadowMedium}`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = `0 2px 8px ${commonColors.shadowLight}`;
        }}
      >
        <Group gap="sm" mb="md">
          <ThemeIcon
            color={commonColors.accentPrimary}
            variant="light"
            size="lg"
            style={{
              cursor: 'default',
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
            <IconPhoto size={24} />
          </ThemeIcon>
          <Group gap="xs" align="center">
            <Title order={5} fw={700} c={commonColors.textPrimary}>
              Screenshots & Visuals
            </Title>
            <MobileTooltip
              label="Visual examples of technical systems - dashboards, monitoring tools, and behind-the-scenes interfaces."
              multiline
              w={300}
              withArrow
            >
              <ThemeIcon
                color="sakura"
                variant="light"
                size="sm"
                radius="xl"
                style={{ cursor: 'help' }}
              >
                ?
              </ThemeIcon>
            </MobileTooltip>
          </Group>
        </Group>
        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="sm">
          {screenshots.map((screenshot: string, index: number) => (
            <Box
              key={index}
              style={{
                position: 'relative',
                height: '120px',
                borderRadius: 'var(--mantine-radius-sm)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                transform: 'scale(1)',
              }}
              onClick={() => onImageSelect(screenshot)}
              onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${commonColors.shadowMedium}`;
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Image
                src={`/images/technical/${screenshot}`}
                alt={`${sectionKey} screenshot ${index + 1}`}
                height={120}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                }}
              />
              <Box
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0, 0, 0, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.opacity = '0';
                }}
              >
                <ThemeIcon color="white" variant="filled" size="lg" radius="xl">
                  <IconZoomIn size={20} />
                </ThemeIcon>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Card>
    );
  }
);

ScreenshotGallery.displayName = 'ScreenshotGallery';

export default ScreenshotGallery;
