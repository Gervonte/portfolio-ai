'use client';

import { Project } from '@/lib/projects';
import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import '@/styles/technical-modal.css';
import {
  Alert,
  Box,
  Card,
  Group,
  Image,
  Modal,
  Progress,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconActivity,
  IconAlertCircle,
  IconBuilding,
  IconChartBar,
  IconCode,
  IconGauge,
  IconPhoto,
  IconRocket,
  IconSettings,
  IconShield,
  IconTools,
  IconZoomIn,
} from '@tabler/icons-react';
import { memo, useEffect, useMemo, useState } from 'react';
import BadgeWithTooltip from './BadgeWithTooltip';
import { MobileTooltip } from './MobileTooltip';

interface TechnicalDetailsModalProps {
  project: Project;
  opened: boolean;
  onClose: () => void;
}

const getTechnicalIcon = (section: string) => {
  switch (section) {
    case 'analytics':
      return <IconChartBar size={16} />;
    case 'monitoring':
      return <IconShield size={16} />;
    case 'cicd':
      return <IconRocket size={16} />;
    case 'performance':
      return <IconGauge size={16} />;
    case 'architecture':
      return <IconBuilding size={16} />;
    default:
      return <IconChartBar size={16} />;
  }
};

const TechnicalDetailsModal = memo(({ project, opened, onClose }: TechnicalDetailsModalProps) => {
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Get technical sections
  const technicalSections = useMemo(() => {
    return project.technicalDetails
      ? Object.entries(project.technicalDetails)
          .filter(([, section]) => {
            // Only show sections that are enabled and have meaningful content
            return (
              section &&
              section.enabled !== false &&
              (section.description ||
                section.screenshots?.length > 0 ||
                section.metrics ||
                section.tools?.length > 0 ||
                section.workflows?.length > 0 ||
                section.components?.length > 0 ||
                section.uptime ||
                section.errorRate ||
                section.deployment)
            );
          })
          .map(([key, section]) => ({
            key,
            section,
            icon: getTechnicalIcon(key),
          }))
      : [];
  }, [project.technicalDetails]);

  // Set initial active tab to first available section
  useEffect(() => {
    if (technicalSections.length > 0 && !activeTab) {
      setActiveTab(technicalSections[0].key);
    }
  }, [technicalSections, activeTab]);

  // Helper function to check if a section should be displayed
  const shouldShowSection = (section: Record<string, unknown>, sectionType: string) => {
    if (!section) return false;

    switch (sectionType) {
      case 'metrics':
        return (
          section.metrics && Object.keys(section.metrics as Record<string, unknown>).length > 0
        );
      case 'tools':
        return section.tools && Array.isArray(section.tools) && section.tools.length > 0;
      case 'workflows':
        return (
          section.workflows && Array.isArray(section.workflows) && section.workflows.length > 0
        );
      case 'components':
        return (
          section.components && Array.isArray(section.components) && section.components.length > 0
        );
      case 'monitoring':
        return section.uptime || section.errorRate;
      case 'screenshots':
        return (
          section.showScreenshots !== false &&
          section.screenshots &&
          Array.isArray(section.screenshots) &&
          section.screenshots.length > 0
        );
      case 'architecture':
        return (
          (section.components &&
            Array.isArray(section.components) &&
            section.components.length > 0) ||
          section.deployment
        );
      case 'deployment':
        return section.deploymentFrequency || section.leadTime;
      default:
        return true;
    }
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
        styles={{
          content: {
            background: commonColors.backgroundModal,
            border: `1px solid ${commonColors.borderModal}`,
            boxShadow: `0 20px 25px ${commonColors.shadowHeavy}`,
            height: '45vh',
            maxHeight: '45vh',
          },
          body: {
            background: commonColors.backgroundCard,
          },
          header: {
            background: commonColors.backgroundCard,
            borderBottom: `1px solid ${commonColors.borderPrimary}`,
            padding: 'var(--mantine-spacing-xl)',
            minHeight: '80px',
            position: 'relative',
          },
          title: {
            fontSize: 'var(--mantine-font-size-xxl)',
            fontWeight: 700,
          },
          close: {
            color: commonColors.textSecondary,
            background: 'transparent',
            border: 'none',
            borderRadius: 'var(--mantine-radius-md)',
            padding: 'var(--mantine-spacing-sm)',
            fontSize: 'var(--mantine-font-size-lg)',
            transition: 'all 0.2s ease-in-out',
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
        }}
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
        classNames={{
          content: 'technical-modal-content',
          header: 'technical-modal-header',
          body: 'technical-modal-body',
        }}
        styles={{
          content: {
            background: commonColors.backgroundModal,
            border: `1px solid ${commonColors.borderModal}`,
            boxShadow: `0 20px 25px ${commonColors.shadowHeavy}`,
            height: '45vh',
            maxHeight: '45vh',
          },
          body: {
            background: commonColors.backgroundCard,
            padding: '2rem',
            marginTop: '-2px',
            position: 'relative',
            zIndex: 5,
            boxShadow: `inset 0 1px 2px ${commonColors.shadowLight}, 0 2px 4px ${commonColors.shadowLight}`,
            borderRadius: '0 0 var(--mantine-radius-lg) var(--mantine-radius-lg)',
            borderTop: 'none',
          },
          header: {
            background: commonColors.backgroundCard,
            borderBottom: 'none',
            padding:
              'var(--mantine-spacing-xl) var(--mantine-spacing-md) 0 var(--mantine-spacing-md)',
            marginBottom: 0,
            position: 'relative',
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
        }}
        overlayProps={{
          style: {
            backgroundColor: commonColors.shadowHeavy,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          },
        }}
        title={
          <Box>
            <Group gap="sm" align="flex-start" mb="sm" wrap="wrap">
              <ThemeIcon
                color={commonColors.accentPrimary}
                variant="light"
                size="xl"
                style={{
                  cursor: 'default',
                  flexShrink: 0,
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
                {getTechnicalIcon(activeTab || 'analytics')}
              </ThemeIcon>
              <Box style={{ flex: 1, minWidth: '0', overflow: 'hidden' }}>
                <Title
                  id="modal-title"
                  order={1}
                  c={commonColors.textPrimary}
                  fw={800}
                  mb="xs"
                  size="h3"
                  style={{
                    fontSize:
                      'clamp(var(--mantine-font-size-lg), 4vw, var(--mantine-font-size-xl))',
                    lineHeight: 1.2,
                    wordBreak: 'break-word',
                  }}
                >
                  {project.title}
                </Title>
                <Text
                  id="modal-description"
                  size="sm"
                  c={commonColors.textSecondary}
                  fw={500}
                  style={{
                    fontSize:
                      'clamp(var(--mantine-font-size-xs), 3vw, var(--mantine-font-size-sm))',
                    lineHeight: 1.3,
                  }}
                >
                  Technical Deep Dive & Behind the Scenes
                </Text>
              </Box>
            </Group>
            {/* Tabs Navigation */}
            <Box
              style={{
                background: commonColors.backgroundCard,
                padding: '0',
                margin: '0 -1rem',
                borderBottom: 'none',
                display: 'flex',
                justifyContent: 'center',
                width: 'calc(100% + 2rem)',
                minHeight: '64px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                gap: '0',
                position: 'relative',
                zIndex: 10,
                boxShadow: `0 1px 3px ${commonColors.shadowLight}`,
                borderRadius: 'var(--mantine-radius-lg) var(--mantine-radius-lg) 0 0',
              }}
              className="hide-scrollbar"
            >
              {technicalSections.map(({ key, icon }) => (
                <Box
                  key={key}
                  id={`tab-${key}`}
                  onClick={() => setActiveTab(key)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveTab(key);
                    }
                  }}
                  tabIndex={0}
                  role="tab"
                  aria-selected={activeTab === key}
                  aria-controls={`tabpanel-${key}`}
                  style={{
                    fontWeight: 600,
                    transition: 'all 0.2s ease-in-out',
                    padding: 'var(--mantine-spacing-sm) var(--mantine-spacing-md)',
                    fontSize: 'var(--mantine-font-size-sm)',
                    color:
                      activeTab === key ? commonColors.accentPrimary : commonColors.textSecondary,
                    background: activeTab === key ? commonColors.backgroundCard : 'transparent',
                    flex: '1 1 0',
                    minWidth: '0',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop:
                      activeTab === key
                        ? `4px solid ${commonColors.accentPrimary}`
                        : '4px solid transparent',
                    borderBottom:
                      activeTab === key ? 'none' : `2px solid ${commonColors.borderPrimary}`,
                    cursor: 'pointer',
                    height: '100%',
                    minHeight: '56px',
                    whiteSpace: 'nowrap',
                    transform: activeTab === key ? 'scale(1.01)' : 'scale(1)',
                    boxShadow:
                      activeTab === key
                        ? `0 2px 8px ${commonColors.shadowLight}, 0 1px 2px ${commonColors.shadowLight}`
                        : `0 1px 2px ${commonColors.shadowLight}`,
                    borderRadius:
                      activeTab === key
                        ? 'var(--mantine-radius-md) var(--mantine-radius-md) 0 0'
                        : '0',
                    position: 'relative',
                    overflow: 'hidden',
                    zIndex: activeTab === key ? 20 : 1,
                    marginBottom: activeTab === key ? '-1px' : '0',
                    marginTop: activeTab === key ? '1px' : '0',
                  }}
                  onMouseEnter={e => {
                    if (activeTab !== key) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 3px 12px ${commonColors.shadowLight}, 0 1px 3px ${commonColors.shadowLight}`;
                      e.currentTarget.style.marginTop = '1px';
                      e.currentTarget.style.marginBottom = '-1px';
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeTab !== key) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = `0 1px 2px ${commonColors.shadowLight}`;
                      e.currentTarget.style.marginTop = '0';
                      e.currentTarget.style.marginBottom = '0';
                    }
                  }}
                >
                  <Group gap="sm" align="center" wrap="nowrap">
                    {icon}
                    <Text size="sm" fw={600}>
                      {key === 'cicd' ? 'CI/CD' : key.charAt(0).toUpperCase() + key.slice(1)}
                    </Text>
                  </Group>
                </Box>
              ))}
            </Box>
          </Box>
        }
      >
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          variant="pills"
          color={commonColors.accentPrimary}
        >
          {technicalSections.map(({ key, section }) => (
            <Tabs.Panel
              key={key}
              value={key}
              pt="xl"
              id={`tabpanel-${key}`}
              role="tabpanel"
              aria-labelledby={`tab-${key}`}
            >
              <Stack gap="xl">
                {/* Overview Card */}
                <Card
                  padding="xl"
                  radius="md"
                  style={{
                    background: commonColors.backgroundCard,
                    boxShadow: `0 2px 8px ${commonColors.shadowLight}`,
                    minHeight: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
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
                  <Group gap="sm" mb="sm">
                    <ThemeIcon
                      color={commonColors.accentPrimary}
                      variant="light"
                      size="xl"
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
                      {getTechnicalIcon(key)}
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Title order={3} c={commonColors.textPrimary} fw={700} mb="xs">
                        {key === 'cicd' ? 'CI/CD' : key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                        Overview
                      </Title>
                      <Text size="md" c={commonColors.textSecondary} lh={1.6}>
                        {section.description}
                      </Text>
                    </Box>
                  </Group>
                </Card>

                {/* Metrics Display */}
                {shouldShowSection(section, 'metrics') && (
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
                        <IconChartBar size={24} />
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c={commonColors.textPrimary}>
                          Key Metrics
                        </Title>
                        <MobileTooltip
                          label="Performance indicators - visitor counts, session duration, and engagement metrics."
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
                    <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="sm">
                      {Object.entries(section.metrics).map(([metricKey, value]) => (
                        <Card
                          key={metricKey}
                          padding="lg"
                          radius="md"
                          style={{
                            background: commonColors.backgroundCard,
                            textAlign: 'center',
                            transition: 'all 0.2s ease-in-out',
                            cursor: 'default',
                            transform: 'scale(1)',
                          }}
                          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            e.currentTarget.style.borderColor = commonColors.accentPrimary;
                          }}
                          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = commonColors.borderPrimary;
                          }}
                        >
                          <Text
                            size="xs"
                            c={commonColors.textSecondary}
                            tt="uppercase"
                            fw={600}
                            mb="xs"
                            style={{ letterSpacing: '0.5px' }}
                          >
                            {metricKey.replace(/([A-Z])/g, ' $1').trim()}
                          </Text>
                          <Text size="xl" fw={800} c={commonColors.accentPrimary}>
                            {String(value)}
                          </Text>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </Card>
                )}

                {/* Additional Data */}
                {shouldShowSection(section, 'tools') && (
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
                    <Group gap="sm" mb="sm">
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
                        <IconTools size={24} />
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c={commonColors.textPrimary}>
                          Tools & Technologies
                        </Title>
                        <MobileTooltip
                          label="Programming languages, frameworks, and tools used to build this project."
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
                    <Group gap="sm">
                      {section.tools.map((tool: string) => (
                        <BadgeWithTooltip
                          key={tool}
                          contextType="technology"
                          contextValue={tool}
                          size="sm"
                          variant="filled"
                          color={commonColors.accentPrimary}
                        >
                          {tool}
                        </BadgeWithTooltip>
                      ))}
                    </Group>
                  </Card>
                )}

                {/* Monitoring Data */}
                {shouldShowSection(section, 'monitoring') && (
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
                    <Group gap="sm" mb="sm">
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
                        <IconChartBar size={24} />
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c={commonColors.textPrimary}>
                          System Health
                        </Title>
                        <MobileTooltip
                          label="Reliability metrics - uptime percentage and error rates to ensure stable operation."
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
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                      {section.uptime && (
                        <Card
                          padding="sm"
                          radius="md"
                          style={{
                            background: commonColors.backgroundCard,
                          }}
                        >
                          <Text size="sm" c={commonColors.textSecondary} fw={600} mb="xs">
                            Uptime
                          </Text>
                          <Text size="xl" fw={800} c={commonColors.accentPrimary}>
                            {section.uptime}
                          </Text>
                        </Card>
                      )}
                      {section.errorRate && (
                        <Card
                          padding="sm"
                          radius="md"
                          style={{
                            background: commonColors.backgroundCard,
                          }}
                        >
                          <Text size="sm" c={commonColors.textSecondary} fw={600} mb="xs">
                            Error Rate
                          </Text>
                          <Text size="xl" fw={800} c={commonColors.textSecondary}>
                            {section.errorRate}
                          </Text>
                        </Card>
                      )}
                    </SimpleGrid>
                  </Card>
                )}

                {shouldShowSection(section, 'workflows') && (
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
                        <IconSettings size={24} />
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c={commonColors.textPrimary}>
                          CI/CD Workflows
                        </Title>
                        <MobileTooltip
                          label="Automated processes for testing, building, and deploying code changes without manual intervention."
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
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                      {section.workflows.map((workflow: string, index: number) => (
                        <Card
                          key={index}
                          padding="lg"
                          radius="md"
                          withBorder
                          style={{
                            background: commonColors.backgroundModal,
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            cursor: 'default',
                          }}
                          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            e.currentTarget.style.borderColor = commonColors.accentPrimary;
                          }}
                          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = commonColors.borderPrimary;
                          }}
                        >
                          <Text size="md" fw={600} c={commonColors.textPrimary}>
                            {workflow}
                          </Text>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </Card>
                )}

                {/* Performance Metrics */}
                {section.lighthouseScore && (
                  <Card
                    padding="lg"
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
                    <Group gap="sm" mb="sm">
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
                        <IconRocket size={24} />
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c={commonColors.textPrimary}>
                          Performance Metrics
                        </Title>
                        <MobileTooltip
                          label="Performance indicators and optimization metrics for the application."
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
                    <Box>
                      <Group justify="space-between" mb="sm">
                        <Text size="sm" fw={500}>
                          Lighthouse Score
                        </Text>
                        <Text size="lg" fw={700} c={commonColors.accentPrimary}>
                          {section.lighthouseScore}
                        </Text>
                      </Group>
                      <Progress
                        value={section.lighthouseScore}
                        color={
                          section.lighthouseScore >= 90
                            ? commonColors.accentPrimary
                            : section.lighthouseScore >= 70
                              ? commonColors.accentSecondary
                              : commonColors.textSecondary
                        }
                        size="lg"
                        radius="xl"
                        style={{
                          height: '12px',
                        }}
                      />
                    </Box>
                  </Card>
                )}

                {/* Core Web Vitals */}
                {section.coreWebVitals && (
                  <Card
                    padding="lg"
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
                    <Group gap="sm" mb="sm">
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
                        <IconActivity size={24} />
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c={commonColors.textPrimary}>
                          Core Web Vitals
                        </Title>
                        <MobileTooltip
                          label="Google's Core Web Vitals metrics measuring user experience and performance."
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
                    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} spacing="sm">
                      {Object.entries(section.coreWebVitals).map(([vital, value]) => (
                        <Box
                          key={vital}
                          p="sm"
                          style={{
                            background: commonColors.backgroundModal,
                            borderRadius: '12px',
                            textAlign: 'center',
                            transition: 'all 0.2s ease-in-out',
                            transform: 'scale(1)',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                            e.currentTarget.style.boxShadow = `0 4px 12px ${commonColors.shadowMedium}`;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <Text
                            size="xs"
                            c={commonColors.textSecondary}
                            tt="uppercase"
                            fw={600}
                            mb="xs"
                          >
                            {vital}
                          </Text>
                          <Text size="xl" fw={700} c={commonColors.accentPrimary}>
                            {String(value)}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Card>
                )}

                {/* Architecture Data */}
                {shouldShowSection(section, 'architecture') && (
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
                        <IconBuilding size={24} />
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c={commonColors.textPrimary}>
                          Architecture & Deployment
                        </Title>
                        <MobileTooltip
                          label="Technical blueprint and deployment strategy - the foundation and delivery system."
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
                    <Stack gap="sm">
                      {section.components && section.components.length > 0 && (
                        <Box
                          p="lg"
                          style={{
                            background: commonColors.backgroundModal,
                            borderRadius: '12px',
                          }}
                        >
                          <Text size="sm" c={commonColors.textSecondary} fw={600} mb="sm">
                            Key Components
                          </Text>
                          <Group gap="sm">
                            {section.components.map((component: string) => (
                              <BadgeWithTooltip
                                key={component}
                                contextType="technology"
                                contextValue={component}
                                size="sm"
                                variant="outline"
                                color={commonColors.accentPrimary}
                              >
                                {component}
                              </BadgeWithTooltip>
                            ))}
                          </Group>
                        </Box>
                      )}
                      {section.deployment && (
                        <Box
                          p="lg"
                          style={{
                            background: commonColors.backgroundModal,
                            borderRadius: '12px',
                          }}
                        >
                          <Text size="sm" c={commonColors.textSecondary} fw={600} mb="sm">
                            Deployment
                          </Text>
                          <Text size="md" fw={600} c={commonColors.textPrimary}>
                            {section.deployment}
                          </Text>
                        </Box>
                      )}
                    </Stack>
                  </Card>
                )}

                {/* Deployment Data for CI/CD */}
                {key === 'cicd' && shouldShowSection(section, 'deployment') && (
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
                        <IconCode size={24} />
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c={commonColors.textPrimary}>
                          Deployment Metrics
                        </Title>
                        <MobileTooltip
                          label="Release frequency and speed metrics - how often and how quickly updates are deployed."
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
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                      {section.deploymentFrequency && (
                        <Card
                          padding="sm"
                          radius="md"
                          style={{
                            background: commonColors.backgroundCard,
                          }}
                        >
                          <Text size="sm" c={commonColors.textSecondary} fw={600} mb="xs">
                            Deployment Frequency
                          </Text>
                          <Text size="lg" fw={800} c={commonColors.accentPrimary}>
                            {section.deploymentFrequency}
                          </Text>
                        </Card>
                      )}
                      {section.leadTime && (
                        <Card
                          padding="sm"
                          radius="md"
                          style={{
                            background: commonColors.backgroundCard,
                          }}
                        >
                          <Text size="sm" c={commonColors.textSecondary} fw={600} mb="xs">
                            Lead Time
                          </Text>
                          <Text size="lg" fw={800} c={commonColors.accentPrimary}>
                            {section.leadTime}
                          </Text>
                        </Card>
                      )}
                    </SimpleGrid>
                  </Card>
                )}

                {/* Screenshots Section for all tabs */}
                {shouldShowSection(section, 'screenshots') && (
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
                        <Title order={4} fw={700} c={commonColors.textPrimary}>
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
                      {section.screenshots.map((screenshot: string, index: number) => (
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
                          onClick={() => setSelectedImage(screenshot)}
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
                            alt={`${key} screenshot ${index + 1}`}
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
                )}
              </Stack>
            </Tabs.Panel>
          ))}
        </Tabs>
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
            height: '45vh',
            maxHeight: '45vh',
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
          <Image src={`/images/technical/${selectedImage}`} alt="Technical screenshot" />
        )}
      </Modal>
    </>
  );
});

TechnicalDetailsModal.displayName = 'TechnicalDetailsModal';

export default TechnicalDetailsModal;
