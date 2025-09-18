'use client';

import { Badge, Box, Group, Text } from '@mantine/core';
import { memo } from 'react';
import BadgeWithTooltip from '../../BadgeWithTooltip';
import { MobileTooltip } from '../../MobileTooltip';
import { AIToolsSectionProps } from '../types';

const AIToolsSection = memo(({ aiTools, limitBadges }: AIToolsSectionProps) => {
  if (aiTools.length === 0) return null;

  return (
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
  );
});

AIToolsSection.displayName = 'AIToolsSection';

export default AIToolsSection;
