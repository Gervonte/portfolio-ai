'use client';

import { Box, Group, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { memo } from 'react';
import { MobileTooltip } from '../../MobileTooltip';
import { HeaderSectionProps } from '../types';

const HeaderSection = memo(
  ({
    title,
    subtitle,
    description,
    longDescription,
    headerIcon,
    headerIconColor,
    infoBoxDescription,
  }: HeaderSectionProps) => {
    return (
      <Group justify="space-between" align="flex-start" mb="sm">
        <Group>
          <Box>
            <Stack gap="xs">
              <Box>
                {infoBoxDescription ? (
                  // Work experience layout with icon, title/subtitle, and description
                  <Group align="flex-start" gap="md">
                    {headerIcon && (
                      <ThemeIcon
                        color={headerIconColor}
                        variant="light"
                        size="lg"
                        style={{
                          cursor: 'default',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {headerIcon}
                      </ThemeIcon>
                    )}
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Group align="flex-start" gap="md" mb="xs">
                        <Title
                          order={3}
                          size="h3"
                          c="dark"
                          style={{
                            wordBreak: 'break-word',
                            lineHeight: 1.2,
                          }}
                        >
                          {title}
                        </Title>
                        {subtitle && (
                          <Text
                            size="md"
                            c="sakura"
                            fw={400}
                            style={{
                              wordBreak: 'break-word',
                              lineHeight: 1.3,
                            }}
                          >
                            {subtitle}
                          </Text>
                        )}
                      </Group>
                      {/* Description */}
                      {(description || longDescription) && (
                        <Group align="center" gap="xs">
                          <Text
                            component="span"
                            size="sm"
                            lh={1.6}
                            c="gray.6"
                            fs="italic"
                            style={{
                              letterSpacing: '0.01em',
                            }}
                          >
                            {description}
                            {longDescription && (
                              <MobileTooltip
                                label={
                                  <Stack gap="xs">
                                    <Text c="sakura" fw={600} size="sm">
                                      About NovaCredit
                                    </Text>
                                    {longDescription.split('\n\n').map((paragraph, index) => (
                                      <Text
                                        key={index}
                                        size="sm"
                                        mb={
                                          index < longDescription.split('\n\n').length - 1
                                            ? 'xs'
                                            : 0
                                        }
                                      >
                                        {paragraph}
                                      </Text>
                                    ))}
                                  </Stack>
                                }
                                multiline
                                w={300}
                                withArrow
                                withinPortal
                              >
                                <ThemeIcon
                                  size="xs"
                                  variant="light"
                                  style={{
                                    cursor: 'help',
                                    display: 'inline-flex',
                                    verticalAlign: 'middle',
                                    marginLeft: '4px',
                                  }}
                                >
                                  ?
                                </ThemeIcon>
                              </MobileTooltip>
                            )}
                          </Text>
                        </Group>
                      )}
                    </Box>
                  </Group>
                ) : (
                  // Project card layout - simple title and subtitle
                  <Group align="flex-start" gap="md">
                    {headerIcon && (
                      <ThemeIcon
                        color={headerIconColor}
                        variant="light"
                        size="lg"
                        style={{
                          cursor: 'default',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'scale(1.1)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        {headerIcon}
                      </ThemeIcon>
                    )}
                    <Box style={{ flex: 1, minWidth: 0 }}>
                      <Title
                        order={4}
                        size="h4"
                        c="dark"
                        style={{
                          wordBreak: 'break-word',
                          lineHeight: 1.2,
                        }}
                      >
                        {title}
                      </Title>
                      {subtitle && (
                        <Text
                          size="sm"
                          c="sakura"
                          style={{
                            wordBreak: 'break-word',
                            lineHeight: 1.3,
                          }}
                        >
                          {subtitle}
                        </Text>
                      )}
                    </Box>
                  </Group>
                )}
              </Box>
              {/* Description for project cards */}
              {!infoBoxDescription && (description || longDescription) && (
                <Text
                  size="sm"
                  lh={1.6}
                  c="gray.6"
                  mb="md"
                  style={{
                    fontStyle: 'italic',
                    lineHeight: '1.6',
                    letterSpacing: '0.01em',
                  }}
                >
                  {longDescription || description}
                </Text>
              )}
            </Stack>
          </Box>
        </Group>
      </Group>
    );
  }
);

HeaderSection.displayName = 'HeaderSection';

export default HeaderSection;
