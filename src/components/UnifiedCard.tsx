'use client';

import { colorCombinations } from '@/lib/colors';
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconExternalLink, IconSettings } from '@tabler/icons-react';
import { ReactNode } from 'react';
import BadgeWithTooltip from './BadgeWithTooltip';
import { MobileTooltip } from './MobileTooltip';
import { TouchActionIcon } from './TouchActionIcon';

export interface UnifiedCardProps {
  // Content
  title: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;

  // Visual elements
  thumbnail?: {
    src: string;
    alt: string;
    fallbackIcon?: ReactNode;
  };

  // Header section
  headerIcon?: ReactNode;
  headerIconColor?: string;
  statusBadge?: {
    text: string;
    color: string;
    contextType?: 'status' | 'projectType' | 'skill' | 'technology' | 'aiTool' | 'cache';
    contextValue?: string;
  };

  // Content sections
  technologies?: Array<{
    name: string;
    color: string;
    contextType?: 'technology' | 'skill' | 'aiTool';
    contextValue?: string;
  }>;

  aiTools?: Array<{
    name: string;
    color: string;
    contextType?: 'aiTool';
    contextValue?: string;
  }>;

  achievements?: string[];
  highlights?: string[];

  // Actions
  primaryAction?: {
    label: string;
    icon?: ReactNode;
    href?: string;
    onClick?: () => void;
    tooltip?: string;
  };

  secondaryAction?: {
    label: string;
    icon?: ReactNode;
    href?: string;
    onClick?: () => void;
    tooltip?: string;
  };

  // Metadata
  timeline?: string;
  metadata?: Array<{
    icon: ReactNode;
    text: string;
  }>;

  // Styling
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  hoverable?: boolean;
  backgroundGradient?: string;

  // Technical details (for projects)
  enableTechnicalDetails?: boolean;
  onTechnicalDetailsClick?: () => void;

  // Badge limiting (for All Projects section)
  limitBadges?: boolean;

  // Professional achievements styling (for work experience)
  professionalAchievements?: boolean;

  // Info box styling for descriptions (for work experience)
  infoBoxDescription?: boolean;

  // Custom content
  children?: ReactNode;
}

const UnifiedCard = ({
  title,
  subtitle,
  description,
  longDescription,
  thumbnail,
  headerIcon,
  headerIconColor = 'sakura',
  statusBadge,
  technologies = [],
  aiTools = [],
  achievements = [],
  highlights = [],
  primaryAction,
  secondaryAction,
  timeline,
  metadata = [],
  variant = 'default',
  size = 'md',
  interactive = true,
  hoverable = true,
  backgroundGradient = colorCombinations.sakuraGradient,
  enableTechnicalDetails = false,
  onTechnicalDetailsClick,
  limitBadges = false,
  professionalAchievements = false,
  infoBoxDescription = false,
  children,
}: UnifiedCardProps) => {
  const getCardStyles = () => {
    const baseStyles = {
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    };

    if (variant === 'elevated') {
      return {
        ...baseStyles,
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      };
    }

    if (variant === 'outlined') {
      return {
        ...baseStyles,
        boxShadow: 'none',
        border: '2px solid',
        borderColor: 'var(--mantine-color-gray-3)',
      };
    }

    if (variant === 'filled') {
      return {
        ...baseStyles,
        background: 'var(--mantine-color-gray-0)',
      };
    }

    return baseStyles;
  };

  const getThumbnailHeight = () => {
    switch (size) {
      case 'sm':
        return '120px';
      case 'md':
        return '160px';
      case 'lg':
        return '200px';
      default:
        return '160px';
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return 'md';
      case 'md':
        return 'lg';
      case 'lg':
        return 'xl';
      default:
        return 'lg';
    }
  };

  return (
    <Card
      p={getPadding()}
      withBorder
      radius="lg"
      h="100%"
      style={getCardStyles()}
      onMouseEnter={
        hoverable
          ? e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }
          : undefined
      }
      onMouseLeave={
        hoverable
          ? e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }
          : undefined
      }
    >
      <Stack gap="md" h="100%">
        {/* Thumbnail Section */}
        {thumbnail && (
          <Box
            component={thumbnail.src ? 'a' : 'div'}
            {...(thumbnail.src
              ? {
                  href: primaryAction?.href || '#',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }
              : {})}
            style={{
              position: 'relative',
              height: getThumbnailHeight(),
              borderRadius: '8px',
              overflow: 'hidden',
              background: backgroundGradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: interactive ? 'pointer' : 'default',
              textDecoration: 'none',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={
              interactive
                ? (e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                  }
                : undefined
            }
            onMouseLeave={
              interactive
                ? (e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                : undefined
            }
          >
            {thumbnail.src && (
              <Image
                src={thumbnail.src}
                alt={thumbnail.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  transition: 'transform 0.3s ease',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
                onMouseEnter={
                  interactive
                    ? (e: React.MouseEvent<HTMLImageElement>) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }
                    : undefined
                }
                onMouseLeave={
                  interactive
                    ? (e: React.MouseEvent<HTMLImageElement>) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }
                    : undefined
                }
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
            )}

            {/* Fallback content */}
            <Box
              style={{
                width: '100%',
                height: '100%',
                display: thumbnail.src ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: backgroundGradient,
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              {thumbnail.fallbackIcon || (
                <ThemeIcon color="white" variant="filled" size="xl" radius="xl">
                  {headerIcon}
                </ThemeIcon>
              )}
            </Box>

            {/* Click indicator overlay */}
            {interactive && thumbnail.src && (
              <Box
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '50%',
                  padding: '8px',
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
                <IconExternalLink size={16} color="white" />
              </Box>
            )}

            {/* Status badge overlay */}
            {statusBadge && (
              <BadgeWithTooltip
                contextType={statusBadge.contextType || 'status'}
                contextValue={statusBadge.contextValue || statusBadge.text}
                color={statusBadge.color}
                variant="filled"
                size="sm"
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                }}
              >
                {statusBadge.text}
              </BadgeWithTooltip>
            )}
          </Box>
        )}

        {/* Header Section */}
        <Group justify="space-between" align="flex-start" mb="sm">
          <Group>
            <Box>
              <Stack gap="xs">
                <Box>
                  {infoBoxDescription ? (
                    // Work experience layout with icon, title/subtitle, and description
                    <Group align="flex-start" gap="md">
                      {headerIcon && (
                        <ThemeIcon color={headerIconColor} variant="light" size="lg">
                          {headerIcon}
                        </ThemeIcon>
                      )}
                      <Box style={{ flex: 1, minWidth: 0 }}>
                        <Group align="flex-start" gap="md" mb="xs">
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
                              size="sm"
                              lh={1.6}
                              c="gray.6"
                              fs="italic"
                              style={{
                                letterSpacing: '0.01em',
                              }}
                            >
                              {description}
                            </Text>
                            {longDescription && (
                              <MobileTooltip
                                label={longDescription}
                                multiline
                                w={300}
                                withArrow
                                withinPortal
                              >
                                <ThemeIcon
                                  size="xs"
                                  variant="light"
                                  color="gray"
                                  style={{ cursor: 'help' }}
                                >
                                  ?
                                </ThemeIcon>
                              </MobileTooltip>
                            )}
                          </Group>
                        )}
                      </Box>
                    </Group>
                  ) : (
                    // Project card layout - simple title and subtitle
                    <Group align="flex-start" gap="md">
                      {headerIcon && (
                        <ThemeIcon color={headerIconColor} variant="light" size="lg">
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
          {/* Timeline badge for work experience only */}
          {timeline && infoBoxDescription && (
            <Badge color="sakura" variant="light" size="sm">
              {timeline}
            </Badge>
          )}
        </Group>

        {/* Achievements or Highlights */}
        {(achievements.length > 0 || highlights.length > 0) && (
          <Box mb="sm">
            {professionalAchievements ? (
              <Stack gap="sm">
                {(achievements.length > 0 ? achievements : highlights)
                  .slice(0, 3)
                  .map((item, idx) => (
                    <Text key={idx} size="sm" lh={1.5} c="gray.6" fs="italic">
                      {item}
                    </Text>
                  ))}
              </Stack>
            ) : (
              <List size="sm" spacing="xs">
                {(achievements.length > 0 ? achievements : highlights)
                  .slice(0, 3)
                  .map((item, idx) => (
                    <List.Item key={idx}>{item}</List.Item>
                  ))}
              </List>
            )}
          </Box>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <Box mb="sm">
            <Text size="sm" fw={500} mb="xs">
              Technologies:
            </Text>
            <Group gap="xs" wrap="wrap">
              {(limitBadges ? technologies.slice(0, 4) : technologies).map((tech, index) => (
                <BadgeWithTooltip
                  key={index}
                  contextType={tech.contextType || 'technology'}
                  contextValue={tech.contextValue || tech.name}
                  size="sm"
                  variant="outline"
                  color={tech.color}
                >
                  {tech.name}
                </BadgeWithTooltip>
              ))}
              {limitBadges && technologies.length > 4 && (
                <MobileTooltip
                  label={`Additional technologies: ${technologies
                    .slice(4)
                    .map(t => t.name)
                    .join(', ')}`}
                  multiline
                  withArrow
                  withinPortal
                >
                  <Badge
                    size="sm"
                    variant="filled"
                    color={technologies[0]?.color || 'sakura'}
                    style={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      opacity: 0.8,
                    }}
                  >
                    +{technologies.length - 4} more
                  </Badge>
                </MobileTooltip>
              )}
            </Group>
          </Box>
        )}

        {/* AI Tools */}
        {aiTools.length > 0 && (
          <Box mb="sm">
            <Text size="sm" fw={500} mb="xs">
              AI Tools Used:
            </Text>
            <Group gap="xs" wrap="wrap">
              {(limitBadges ? aiTools.slice(0, 4) : aiTools).map((tool, index) => (
                <BadgeWithTooltip
                  key={index}
                  contextType={tool.contextType || 'aiTool'}
                  contextValue={tool.contextValue || tool.name}
                  size="sm"
                  variant="filled"
                  color={tool.color}
                >
                  {tool.name}
                </BadgeWithTooltip>
              ))}
              {limitBadges && aiTools.length > 4 && (
                <MobileTooltip
                  label={`Additional AI tools: ${aiTools
                    .slice(4)
                    .map(t => t.name)
                    .join(', ')}`}
                  multiline
                  withArrow
                  withinPortal
                >
                  <Badge
                    size="sm"
                    variant="filled"
                    color={aiTools[0]?.color || 'sakura'}
                    style={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      opacity: 0.8,
                    }}
                  >
                    +{aiTools.length - 4} more
                  </Badge>
                </MobileTooltip>
              )}
            </Group>
          </Box>
        )}

        {/* Technical Details Button - Prominent CTA */}
        {enableTechnicalDetails && onTechnicalDetailsClick && (
          <Button
            variant="light"
            color="sakura"
            size="sm"
            fullWidth
            leftSection={<IconSettings size={16} />}
            onClick={onTechnicalDetailsClick}
            mb="sm"
            style={{
              fontWeight: 600,
            }}
          >
            View Technical Details
          </Button>
        )}

        {/* Custom content */}
        {children}

        {/* Footer with metadata and actions */}
        <Group justify="space-between" mt="md">
          <Group gap="xs">
            {/* Timeline for project cards */}
            {timeline && !infoBoxDescription && (
              <Badge color="sakura" variant="light" size="sm">
                {timeline}
              </Badge>
            )}
            {metadata.map((meta, index) => {
              // Check if the text looks like a URL
              const isUrl = meta.text.includes('.com') || meta.text.includes('http');

              if (isUrl) {
                return (
                  <TouchActionIcon
                    key={index}
                    tooltip={`Visit ${meta.text}`}
                    href={meta.text.startsWith('http') ? meta.text : `https://${meta.text}`}
                    target="_blank"
                    color="sakura"
                    variant="light"
                    size="sm"
                  >
                    {meta.icon}
                  </TouchActionIcon>
                );
              }

              return (
                <Group key={index} gap="xs">
                  {meta.icon}
                  <Text size="sm" c="gray.6">
                    {meta.text}
                  </Text>
                </Group>
              );
            })}
          </Group>

          <Group gap="xs">
            {primaryAction && (
              <TouchActionIcon
                tooltip={primaryAction.tooltip || primaryAction.label}
                href={primaryAction.href}
                onClick={primaryAction.onClick}
                color="sakura"
                variant="light"
                size="sm"
              >
                {primaryAction.icon || primaryAction.label}
              </TouchActionIcon>
            )}

            {secondaryAction && (
              <TouchActionIcon
                tooltip={secondaryAction.tooltip || secondaryAction.label}
                href={secondaryAction.href}
                onClick={secondaryAction.onClick}
                color="sakura"
                variant="light"
                size="sm"
              >
                {secondaryAction.icon || secondaryAction.label}
              </TouchActionIcon>
            )}
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default UnifiedCard;
