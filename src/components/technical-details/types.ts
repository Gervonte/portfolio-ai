import { Project, TechnicalSection } from '@/lib/projects';

// Extended section type with all possible properties
export interface ExtendedTechnicalSection extends TechnicalSection {
  metrics?: Record<string, unknown>;
  tools?: string[];
  workflows?: string[];
  components?: string[];
  uptime?: string | number;
  errorRate?: string | number;
  deployment?: string;
  deploymentFrequency?: string | number;
  leadTime?: string | number;
  lighthouseScore?: number;
  coreWebVitals?: Record<string, unknown>;
}

export interface TechnicalSectionWithKey {
  key: string;
  section: ExtendedTechnicalSection;
  icon: React.ReactNode;
}

export interface TechnicalDetailsModalProps {
  project: Project;
  opened: boolean;
  onClose: () => void;
}

export interface CommonColors {
  backgroundModal: string;
  backgroundCard: string;
  borderModal: string;
  borderPrimary: string;
  textPrimary: string;
  textSecondary: string;
  accentPrimary: string;
  accentSecondary: string;
  shadowLight: string;
  shadowMedium: string;
  shadowHeavy: string;
}

export interface SectionCardProps {
  section: ExtendedTechnicalSection;
  sectionKey: string;
  commonColors: CommonColors;
}

export interface ScreenshotItem {
  src: string;
  caption?: string;
  alt?: string;
}

export interface ScreenshotGalleryProps {
  screenshots: string[] | ScreenshotItem[];
  sectionKey: string;
  commonColors: CommonColors;
  onImageSelect: (image: ScreenshotItem) => void;
}

export interface TabNavigationProps {
  technicalSections: TechnicalSectionWithKey[];
  activeTab: string | null;
  onTabChange: (tab: string) => void;
  commonColors: CommonColors;
}

export interface ModalHeaderProps {
  project: Project;
  activeTab: string | null;
  commonColors: CommonColors;
}
