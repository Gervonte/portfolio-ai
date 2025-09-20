'use client';

import { useCommonColors } from '@/lib/theme-aware-colors';
import '@/styles/technical-modal.css';
import { Alert, Box, Button, Group, Modal, Text } from '@mantine/core';
import { IconAlertCircle, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
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
  ScreenshotItem,
  TechnicalDetailsModalProps,
  TechnicalSectionWithKey,
} from './types';
import { getTechnicalIcon, shouldShowSection } from './utils';

const TechnicalDetailsModal = memo(({ project, opened, onClose }: TechnicalDetailsModalProps) => {
  const commonColors = useCommonColors();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ScreenshotItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [currentTabScreenshots, setCurrentTabScreenshots] = useState<ScreenshotItem[]>([]);

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

  // Collect screenshots from the active tab only
  useEffect(() => {
    if (project.technicalDetails && activeTab) {
      const section = project.technicalDetails[activeTab as keyof typeof project.technicalDetails];
      const tabScreenshots: ScreenshotItem[] = [];

      if (section && section.screenshots && section.screenshots.length > 0) {
        section.screenshots.forEach((screenshot: string | ScreenshotItem) => {
          if (typeof screenshot === 'string') {
            tabScreenshots.push({
              src: screenshot,
              alt: `Screenshot`,
              caption: `Screenshot`,
            });
          } else {
            tabScreenshots.push(screenshot);
          }
        });
      }
      setCurrentTabScreenshots(tabScreenshots);
    }
  }, [project.technicalDetails, activeTab]);

  // Navigation functions
  const goToPrevious = () => {
    if (currentTabScreenshots.length > 0) {
      const newIndex =
        currentImageIndex > 0 ? currentImageIndex - 1 : currentTabScreenshots.length - 1;
      setCurrentImageIndex(newIndex);
      setSelectedImage(currentTabScreenshots[newIndex]);
    }
  };

  const goToNext = () => {
    if (currentTabScreenshots.length > 0) {
      const newIndex =
        currentImageIndex < currentTabScreenshots.length - 1 ? currentImageIndex + 1 : 0;
      setCurrentImageIndex(newIndex);
      setSelectedImage(currentTabScreenshots[newIndex]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImage) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          goToPrevious();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          goToNext();
        } else if (event.key === 'Escape') {
          event.preventDefault();
          setSelectedImage(null);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex, currentTabScreenshots]);

  // Update current image when selectedImage changes
  useEffect(() => {
    if (selectedImage && currentTabScreenshots.length > 0) {
      const index = currentTabScreenshots.findIndex(img => img.src === selectedImage.src);
      if (index !== -1) {
        setCurrentImageIndex(index);
      }
    }
  }, [selectedImage, currentTabScreenshots]);

  // Reset image selection when tab changes
  useEffect(() => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
  }, [activeTab]);

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
                    onImageSelect={image => {
                      setSelectedImage(image);
                      const index = currentTabScreenshots.findIndex(img => img.src === image.src);
                      if (index !== -1) {
                        setCurrentImageIndex(index);
                      }
                    }}
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
        size="90vw"
        centered
        title={
          <Group justify="space-between" w="100%">
            <Text size="lg" fw={600} c={commonColors.textPrimary}>
              {selectedImage?.caption || 'Technical Screenshot'}
            </Text>
            <Text size="sm" c={commonColors.textSecondary}>
              {currentImageIndex + 1} of {currentTabScreenshots.length}
            </Text>
          </Group>
        }
        styles={{
          content: {
            background: commonColors.backgroundModal,
            border: `1px solid ${commonColors.borderModal}`,
            boxShadow: `0 20px 25px ${commonColors.shadowHeavy}`,
            maxHeight: '90vh',
            padding: 0,
          },
          body: {
            background: commonColors.backgroundCard,
            padding: 0,
          },
          header: {
            background: commonColors.backgroundCard,
            borderBottom: `1px solid ${commonColors.borderPrimary}`,
            padding: '1rem 1.5rem',
          },
        }}
      >
        {selectedImage && (
          <Box>
            <Box
              style={{
                position: 'relative',
                maxHeight: '70vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8f9fa',
              }}
            >
              {/* Navigation Buttons */}
              {currentTabScreenshots.length > 1 && (
                <>
                  <Button
                    variant="filled"
                    size="lg"
                    radius="xl"
                    onClick={goToPrevious}
                    style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      border: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                    }}
                  >
                    <IconChevronLeft size={20} />
                  </Button>
                  <Button
                    variant="filled"
                    size="lg"
                    radius="xl"
                    onClick={goToNext}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      zIndex: 10,
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      border: 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.9)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                    }}
                  >
                    <IconChevronRight size={20} />
                  </Button>
                </>
              )}

              <Image
                src={`/images/technical/${selectedImage.src}`}
                alt={selectedImage.alt || 'Technical screenshot'}
                width={1200}
                height={800}
                style={{
                  maxWidth: '100%',
                  maxHeight: '70vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            </Box>
            {selectedImage.caption && (
              <Box p="lg" style={{ borderTop: `1px solid ${commonColors.borderPrimary}` }}>
                <Text size="md" fw={500} c={commonColors.textPrimary} style={{ lineHeight: 1.5 }}>
                  {selectedImage.caption}
                </Text>
              </Box>
            )}
          </Box>
        )}
      </Modal>
    </>
  );
});

TechnicalDetailsModal.displayName = 'TechnicalDetailsModal';

export default TechnicalDetailsModal;
