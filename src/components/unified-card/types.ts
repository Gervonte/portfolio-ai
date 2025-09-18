import { ReactNode } from 'react';

// Base interfaces
export interface ThumbnailProps {
  src?: string;
  alt: string;
  fallbackIcon?: ReactNode;
}

export interface StatusBadgeProps {
  text: string;
  color: string;
  contextType?: 'status' | 'projectType' | 'skill' | 'technology' | 'aiTool' | 'cache';
  contextValue?: string;
}

export interface TechnologyProps {
  name: string;
  color: string;
  contextType?: 'technology' | 'skill' | 'aiTool';
  contextValue?: string;
}

export interface AIToolProps {
  name: string;
  color: string;
  contextType?: 'aiTool';
  contextValue?: string;
}

export interface ActionProps {
  label: string;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
  tooltip?: string;
}

export interface MetadataProps {
  icon: ReactNode;
  text: string;
}

// Main UnifiedCard props interface
export interface UnifiedCardProps {
  // Content
  title: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;

  // Visual elements
  thumbnail?: ThumbnailProps;

  // Header section
  headerIcon?: ReactNode;
  headerIconColor?: string;
  statusBadge?: StatusBadgeProps;

  // Content sections
  technologies?: TechnologyProps[];
  aiTools?: AIToolProps[];
  achievements?: string[];
  highlights?: string[];

  // Actions
  primaryAction?: ActionProps;
  secondaryAction?: ActionProps;

  // Metadata
  timeline?: string;
  metadata?: MetadataProps[];

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

// Component-specific prop interfaces
export interface ThumbnailSectionProps {
  thumbnail: ThumbnailProps;
  headerIcon?: ReactNode;
  statusBadge?: StatusBadgeProps;
  primaryAction?: ActionProps;
  interactive: boolean;
  backgroundGradient: string;
  thumbnailHeight: string;
}

export interface HeaderSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  longDescription?: string;
  headerIcon?: ReactNode;
  headerIconColor: string;
  infoBoxDescription: boolean;
}

export interface StatusBadgeSectionProps {
  statusBadge: StatusBadgeProps;
}

export interface TechnologiesSectionProps {
  technologies: TechnologyProps[];
  limitBadges: boolean;
}

export interface AIToolsSectionProps {
  aiTools: AIToolProps[];
  limitBadges: boolean;
}

export interface AchievementsSectionProps {
  achievements: string[];
  highlights: string[];
  professionalAchievements: boolean;
}

export interface TechnicalDetailsButtonProps {
  onTechnicalDetailsClick: () => void;
}

export interface FooterSectionProps {
  timeline?: string;
  metadata: MetadataProps[];
  primaryAction?: ActionProps;
  secondaryAction?: ActionProps;
  infoBoxDescription: boolean;
}

// Common styling interfaces
export interface CardStyles {
  transition: string;
  boxShadow: string;
  border?: string;
  borderColor?: string;
  background?: string;
}

export interface SizeConfig {
  thumbnailHeight: string;
  padding: string;
}
