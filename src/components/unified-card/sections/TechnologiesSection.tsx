'use client';

import { Badge, Box, Group, Text } from '@mantine/core';
import { memo } from 'react';
import BadgeWithTooltip from '../../BadgeWithTooltip';
import { MobileTooltip } from '../../MobileTooltip';
import { TechnologiesSectionProps } from '../types';

const TechnologiesSection = memo(({ technologies, limitBadges }: TechnologiesSectionProps) => {
  if (technologies.length === 0) return null;

  return (
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
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              +{technologies.length - 4} more
            </Badge>
          </MobileTooltip>
        )}
      </Group>
    </Box>
  );
});

TechnologiesSection.displayName = 'TechnologiesSection';

export default TechnologiesSection;
