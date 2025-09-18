'use client';

import { useColorCombinations } from '@/lib/theme-aware-colors';
import { Card, Stack } from '@mantine/core';
import { memo } from 'react';
import AchievementsSection from './sections/AchievementsSection';
import AIToolsSection from './sections/AIToolsSection';
import FooterSection from './sections/FooterSection';
import HeaderSection from './sections/HeaderSection';
import TechnicalDetailsButton from './sections/TechnicalDetailsButton';
import TechnologiesSection from './sections/TechnologiesSection';
import ThumbnailSection from './sections/ThumbnailSection';
import { UnifiedCardProps } from './types';
import { getCardStyles, getDefaultHoverStyles, getHoverStyles, getSizeConfig } from './utils';

const UnifiedCard = memo(
  ({
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
    backgroundGradient,
    enableTechnicalDetails = false,
    onTechnicalDetailsClick,
    limitBadges = false,
    professionalAchievements = false,
    infoBoxDescription = false,
    children,
  }: UnifiedCardProps) => {
    // Theme-aware colors
    const colorCombinations = useColorCombinations();
    const defaultBackgroundGradient = backgroundGradient || colorCombinations.primaryGradient;
    const sizeConfig = getSizeConfig(size);
    const cardStyles = getCardStyles(variant);

    return (
      <Card
        p={sizeConfig.padding}
        withBorder
        radius="lg"
        h="100%"
        style={cardStyles}
        onMouseEnter={
          hoverable
            ? e => {
                Object.assign(e.currentTarget.style, getHoverStyles());
              }
            : undefined
        }
        onMouseLeave={
          hoverable
            ? e => {
                Object.assign(e.currentTarget.style, getDefaultHoverStyles());
              }
            : undefined
        }
      >
        <Stack gap="md" h="100%">
          {/* Thumbnail Section */}
          {thumbnail && (
            <ThumbnailSection
              thumbnail={thumbnail}
              headerIcon={headerIcon}
              statusBadge={statusBadge}
              primaryAction={primaryAction}
              interactive={interactive}
              backgroundGradient={defaultBackgroundGradient}
              thumbnailHeight={sizeConfig.thumbnailHeight}
            />
          )}

          {/* Header Section */}
          <HeaderSection
            title={title}
            subtitle={subtitle}
            description={description}
            longDescription={longDescription}
            headerIcon={headerIcon}
            headerIconColor={headerIconColor}
            infoBoxDescription={infoBoxDescription}
          />

          {/* Timeline badge for work experience only */}
          {timeline && infoBoxDescription && (
            <div style={{ marginTop: '-1rem', marginBottom: '1rem', textAlign: 'right' }}>
              <span
                style={{
                  background: 'var(--mantine-color-sakura-light)',
                  color: 'var(--mantine-color-sakura-5)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 500,
                  cursor: 'default',
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
                {timeline}
              </span>
            </div>
          )}

          {/* Achievements or Highlights */}
          <AchievementsSection
            achievements={achievements}
            highlights={highlights}
            professionalAchievements={professionalAchievements}
          />

          {/* Technologies */}
          <TechnologiesSection technologies={technologies} limitBadges={limitBadges} />

          {/* AI Tools */}
          <AIToolsSection aiTools={aiTools} limitBadges={limitBadges} />

          {/* Technical Details Button - Prominent CTA */}
          {enableTechnicalDetails && onTechnicalDetailsClick && (
            <TechnicalDetailsButton onTechnicalDetailsClick={onTechnicalDetailsClick} />
          )}

          {/* Custom content */}
          {children}

          {/* Footer with metadata and actions */}
          <FooterSection
            timeline={timeline}
            metadata={metadata}
            primaryAction={primaryAction}
            secondaryAction={secondaryAction}
            infoBoxDescription={infoBoxDescription}
          />
        </Stack>
      </Card>
    );
  }
);

UnifiedCard.displayName = 'UnifiedCard';

export default UnifiedCard;
