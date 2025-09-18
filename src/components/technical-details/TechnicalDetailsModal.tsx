'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import '@/styles/technical-modal.css';
import { Alert, Modal } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import Image from 'next/image';
import { memo, useEffect, useMemo, useState } from 'react';
import ModalHeader from './ModalHeader';
import ScreenshotGallery from './ScreenshotGallery';
import ArchitectureCard from './sections/ArchitectureCard';
import DeploymentCard from './sections/DeploymentCard';
import MetricsCard from './sections/MetricsCard';
import MonitoringCard from './sections/MonitoringCard';
import OverviewCard from './sections/OverviewCard';
import PerformanceCard from './sections/PerformanceCard';
import ToolsCard from './sections/ToolsCard';
import WorkflowsCard from './sections/WorkflowsCard';
import TabNavigation from './TabNavigation';
import {
  ExtendedTechnicalSection,
  TechnicalDetailsModalProps,
  TechnicalSectionWithKey,
} from './types';
import { getTechnicalIcon, shouldShowSection } from './utils';

const TechnicalDetailsModal = memo(({ project, opened, onClose }: TechnicalDetailsModalProps) => {
  const commonColors = useCommonColors();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get technical sections
  const technicalSections = useMemo((): TechnicalSectionWithKey[] => {
    return project.technicalDetails
      ? Object.entries(project.technicalDetails)
          .filter(([, section]) => {
            const extendedSection = section as ExtendedTechnicalSection;
            // Only show sections that are enabled and have meaningful content
            return (
              section &&
              section.enabled !== false &&
              (section.description ||
                section.screenshots?.length > 0 ||
                extendedSection.metrics ||
                (extendedSection.tools && extendedSection.tools.length > 0) ||
                (extendedSection.workflows && extendedSection.workflows.length > 0) ||
                (extendedSection.components && extendedSection.components.length > 0) ||
                extendedSection.uptime ||
                extendedSection.errorRate ||
                extendedSection.deployment)
            );
          })
          .map(([key, section]) => ({
            key,
            section: section as ExtendedTechnicalSection,
            icon: getTechnicalIcon(key),
          }))
      : [];
  }, [project.technicalDetails]);

  // Set initial active tab to first available section
  useEffect(() => {
    if (technicalSections.length > 0 && !activeTab) {
      setActiveTab(technicalSections[0].key);
    }
  }, [technicalSections]);

  const modalStyles = {
    content: {
      background: commonColors.backgroundModal,
      border: `1px solid ${commonColors.borderModal}`,
      boxShadow: `0 20px 25px ${commonColors.shadowHeavy}`,
      height: '70vh',
      maxHeight: '70vh',
    },
    body: {
      background: commonColors.backgroundCard,
      padding: '2rem',
      marginTop: '-2px',
      position: 'relative' as const,
      zIndex: 5,
      boxShadow: `inset 0 1px 2px ${commonColors.shadowLight}, 0 2px 4px ${commonColors.shadowLight}`,
      borderRadius: '0 0 var(--mantine-radius-lg) var(--mantine-radius-lg)',
      borderTop: 'none',
    },
    header: {
      background: commonColors.backgroundCard,
      borderBottom: 'none',
      padding: 'var(--mantine-spacing-xl) var(--mantine-spacing-md) 0 var(--mantine-spacing-md)',
      marginBottom: 0,
      position: 'relative' as const,
      zIndex: 100,
      overflow: 'hidden',
    },
    close: {
      color: commonColors.textSecondary,
      background: 'transparent',
      border: 'none',
      borderRadius: 'var(--mantine-radius-md)',
      padding: 'var(--mantine-spacing-xs)',
      transition: 'all 0.2s ease-in-out',
      transform: 'scale(1)',
      '&:hover': {
        color: commonColors.accentPrimary,
        background: commonColors.accentSecondary,
        transform: 'scale(1.1)',
        boxShadow: `0 4px 12px ${commonColors.shadowMedium}`,
      },
      '&:focus': {
        outline: `2px solid ${commonColors.accentPrimary}`,
        outlineOffset: '2px',
      },
    },
  };

  if (!project.technicalDetails) {
    return (
      <Modal
        opened={opened}
        onClose={onClose}
        title="Technical Details"
        centered
        size="xl"
        withCloseButton={false}
        classNames={{
          content: 'technical-modal-content',
          header: 'technical-modal-header',
          body: 'technical-modal-body',
        }}
        styles={modalStyles}
      >
        <Alert
          icon={<IconAlertCircle size={16} />}
          color={commonColors.accentPrimary}
          variant="light"
        >
          Technical details coming soon...
        </Alert>
      </Modal>
    );
  }

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        closeOnClickOutside={true}
        closeOnEscape={true}
        trapFocus={true}
        returnFocus={true}
        centered
        size="xl"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        role="dialog"
        classNames={{
          content: 'technical-modal-content',
          header: 'technical-modal-header',
          body: 'technical-modal-body',
        }}
        styles={modalStyles}
        overlayProps={{
          style: {
            backgroundColor: commonColors.shadowHeavy,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          },
        }}
        title={
          <div>
            <ModalHeader project={project} activeTab={activeTab} commonColors={commonColors} />
            <TabNavigation
              technicalSections={technicalSections}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              commonColors={commonColors}
            />
          </div>
        }
      >
        <div>
          {technicalSections.map(({ key, section }) => (
            <div key={key} style={{ display: activeTab === key ? 'block' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Overview Card */}
                <OverviewCard section={section} sectionKey={key} commonColors={commonColors} />

                {/* Metrics Display */}
                {shouldShowSection(section, 'metrics') ? (
                  <MetricsCard section={section} sectionKey={key} commonColors={commonColors} />
                ) : null}

                {/* Tools & Technologies */}
                {shouldShowSection(section, 'tools') ? (
                  <ToolsCard section={section} sectionKey={key} commonColors={commonColors} />
                ) : null}

                {/* Monitoring Data */}
                {shouldShowSection(section, 'monitoring') ? (
                  <MonitoringCard section={section} sectionKey={key} commonColors={commonColors} />
                ) : null}

                {/* Workflows */}
                {shouldShowSection(section, 'workflows') ? (
                  <WorkflowsCard section={section} sectionKey={key} commonColors={commonColors} />
                ) : null}

                {/* Performance Metrics */}
                <PerformanceCard section={section} sectionKey={key} commonColors={commonColors} />

                {/* Architecture Data */}
                {shouldShowSection(section, 'architecture') ? (
                  <ArchitectureCard
                    section={section}
                    sectionKey={key}
                    commonColors={commonColors}
                  />
                ) : null}

                {/* Deployment Data for CI/CD */}
                {key === 'cicd' && shouldShowSection(section, 'deployment') ? (
                  <DeploymentCard section={section} sectionKey={key} commonColors={commonColors} />
                ) : null}

                {/* Screenshots Section */}
                {shouldShowSection(section, 'screenshots') ? (
                  <ScreenshotGallery
                    screenshots={section.screenshots}
                    sectionKey={key}
                    commonColors={commonColors}
                    onImageSelect={setSelectedImage}
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Image Modal */}
      <Modal
        opened={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        size="xl"
        centered
        title="Technical Screenshot"
        styles={{
          content: {
            background: commonColors.backgroundModal,
            border: `1px solid ${commonColors.borderModal}`,
            boxShadow: `0 20px 25px ${commonColors.shadowHeavy}`,
            height: '70vh',
            maxHeight: '70vh',
          },
          body: {
            background: commonColors.backgroundCard,
          },
          header: {
            background: commonColors.backgroundCard,
            borderBottom: `1px solid ${commonColors.borderPrimary}`,
          },
        }}
      >
        {selectedImage && (
          <Image
            src={`/images/technical/${selectedImage}`}
            alt="Technical screenshot"
            width={800}
            height={600}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </Modal>
    </>
  );
});

TechnicalDetailsModal.displayName = 'TechnicalDetailsModal';

export default TechnicalDetailsModal;
