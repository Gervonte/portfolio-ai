'use client';

import { Project } from '@/lib/projects';
import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import '@/styles/technical-modal.css';
import {
  Alert,
  Badge,
  Box,
  Card,
  Group,
  Image,
  List,
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
  IconAlertCircle,
  IconBuilding,
  IconChartBar,
  IconGauge,
  IconRocket,
  IconShield,
  IconZoomIn,
} from '@tabler/icons-react';
import { memo, useEffect, useMemo, useState } from 'react';
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
        size="50%"
        classNames={{
          content: 'technical-modal-content',
          body: 'technical-modal-body',
        }}
        styles={{
          content: {
            background: commonColors.backgroundModal,
            border: `1px solid ${commonColors.borderModal}`,
            boxShadow: `0 20px 25px ${commonColors.shadowHeavy}`,
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
        withCloseButton={true}
        closeOnClickOutside={true}
        closeOnEscape={true}
        trapFocus={true}
        returnFocus={true}
        centered
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        size="40%"
        classNames={{
          content: 'technical-modal-content',
          body: 'technical-modal-body',
        }}
        styles={{
          content: {
            background: commonColors.backgroundModal,
            border: `1px solid ${commonColors.borderModal}`,
            boxShadow: `0 20px 25px ${commonColors.shadowHeavy}`,
          },
          body: {
            background: commonColors.backgroundCard,
            maxHeight: '60vh',
            minHeight: '300px',
            overflowY: 'auto',
            padding: '2rem',
          },
          header: {
            background: commonColors.backgroundCard,
            borderBottom: `1px solid ${commonColors.borderPrimary}`,
            padding:
              'var(--mantine-spacing-xl) var(--mantine-spacing-md) 0 var(--mantine-spacing-md)',
            marginBottom: 0,
            position: 'relative',
            zIndex: 100,
            overflow: 'hidden',
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
            <Group gap="sm" align="flex-start" mb="md" wrap="wrap">
              <ThemeIcon
                color={commonColors.accentPrimary}
                variant="gradient"
                gradient={{ from: commonColors.accentSecondary, to: commonColors.accentPrimary }}
                size="md"
                radius="xl"
                style={{
                  boxShadow: `0 8px 32px ${commonColors.shadowPrimary}`,
                  flexShrink: 0,
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
                borderBottom: `4px solid ${commonColors.borderPrimary}`,
                display: 'flex',
                justifyContent: 'center',
                width: 'calc(100% + 2rem)',
                minHeight: '44px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
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
                    padding: 'var(--mantine-spacing-xs) var(--mantine-spacing-sm)',
                    fontSize: 'var(--mantine-font-size-xs)',
                    color:
                      activeTab === key ? commonColors.accentPrimary : commonColors.textSecondary,
                    background: activeTab === key ? commonColors.accentSecondary : 'transparent',
                    flex: '1 1 0',
                    minWidth: '0',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop:
                      activeTab === key
                        ? `2px solid ${commonColors.accentPrimary}`
                        : '2px solid transparent',
                    borderLeft: `1px solid ${commonColors.borderPrimary}`,
                    borderRight: `1px solid ${commonColors.borderPrimary}`,
                    borderBottom: 'none',
                    cursor: 'pointer',
                    height: '100%',
                    minHeight: '44px',
                    whiteSpace: 'nowrap',
                    transform: 'scale(1)',
                    boxShadow: 'none',
                  }}
                  onMouseEnter={e => {
                    if (activeTab !== key) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = `0 4px 16px ${commonColors.shadowMedium}`;
                      e.currentTarget.style.background = commonColors.accentSecondary;
                      e.currentTarget.style.color = commonColors.accentPrimary;
                    }
                  }}
                  onMouseLeave={e => {
                    if (activeTab !== key) {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = commonColors.textSecondary;
                    }
                  }}
                >
                  <Group gap="xs" align="center" wrap="nowrap">
                    {icon}
                    <Text size="xs" fw={600}>
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
                  withBorder
                  style={{
                    background: commonColors.backgroundCard,
                    border: `1px solid ${commonColors.borderPrimary}`,
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
                  <Group gap="lg" mb="md">
                    <ThemeIcon
                      color={commonColors.accentPrimary}
                      variant="gradient"
                      gradient={{
                        from: commonColors.accentSecondary,
                        to: commonColors.accentPrimary,
                      }}
                      size="lg"
                      radius="xl"
                      style={{
                        boxShadow: `0 4px 16px ${commonColors.shadowPrimary}`,
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
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color={commonColors.accentPrimary}
                        variant="gradient"
                        gradient={{
                          from: commonColors.accentSecondary,
                          to: commonColors.accentPrimary,
                        }}
                        size="md"
                        radius="xl"
                      >
                        📊
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
                            color={commonColors.textSecondary}
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
                    <SimpleGrid cols={{ base: 1, xs: 2, sm: 4 }} spacing="md">
                      {Object.entries(section.metrics).map(([metricKey, value]) => (
                        <Card
                          key={metricKey}
                          padding="lg"
                          radius="md"
                          withBorder
                          style={{
                            background: commonColors.backgroundCard,
                            border: `1px solid ${commonColors.borderPrimary}`,
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
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Group gap="md" mb="md">
                      <ThemeIcon
                        color={commonColors.accentPrimary}
                        variant="gradient"
                        gradient={{
                          from: commonColors.accentSecondary,
                          to: commonColors.accentPrimary,
                        }}
                        size="md"
                        radius="xl"
                      >
                        🛠️
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
                            color={commonColors.textSecondary}
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
                        <Badge
                          key={tool}
                          size="md"
                          variant="light"
                          color={commonColors.accentPrimary}
                          radius="xl"
                          style={{
                            fontWeight: 600,
                            textTransform: 'none',
                            background: commonColors.accentSecondary,
                            color: commonColors.accentPrimary,
                            border: `1px solid ${commonColors.accentPrimary}`,
                            transition: 'all 0.2s ease-in-out',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.background = commonColors.accentPrimary;
                            e.currentTarget.style.color = commonColors.backgroundCard;
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.background = commonColors.accentSecondary;
                            e.currentTarget.style.color = commonColors.accentPrimary;
                          }}
                        >
                          {tool}
                        </Badge>
                      ))}
                    </Group>
                  </Card>
                )}

                {/* Monitoring Data */}
                {shouldShowSection(section, 'monitoring') && (
                  <Card
                    padding="xl"
                    radius="md"
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Group gap="md" mb="md">
                      <ThemeIcon
                        color={commonColors.accentPrimary}
                        variant="gradient"
                        gradient={{
                          from: commonColors.accentSecondary,
                          to: commonColors.accentPrimary,
                        }}
                        size="md"
                        radius="xl"
                      >
                        📊
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
                            color={commonColors.textSecondary}
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
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                      {section.uptime && (
                        <Card
                          padding="md"
                          radius="md"
                          withBorder
                          style={{
                            background: colorCombinations.earthGradientModal,
                            border: `1px solid ${commonColors.borderEarth}`,
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
                          padding="md"
                          radius="md"
                          withBorder
                          style={{
                            background: colorCombinations.warmGradientModal,
                            border: `1px solid ${commonColors.borderWarm}`,
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
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color={commonColors.accentPrimary}
                        variant="gradient"
                        gradient={{
                          from: commonColors.accentSecondary,
                          to: commonColors.accentPrimary,
                        }}
                        size="md"
                        radius="xl"
                      >
                        ⚡
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
                            color={commonColors.textSecondary}
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
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                      {section.workflows.map((workflow: string, index: number) => (
                        <Card
                          key={index}
                          padding="lg"
                          radius="md"
                          withBorder
                          style={{
                            background: commonColors.backgroundModal,
                            border: `1px solid ${commonColors.borderModal}`,
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

                {shouldShowSection(section, 'components') && (
                  <Card
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Text size="md" fw={600} mb="md" c={commonColors.accentPrimary}>
                      🏗️ Components
                    </Text>
                    <List size="md" spacing="sm">
                      {section.components.map((component: string, index: number) => (
                        <List.Item
                          key={index}
                          style={{
                            padding: '0.5rem',
                            background: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '8px',
                            marginBottom: '0.5rem',
                            fontWeight: 500,
                          }}
                        >
                          {component}
                        </List.Item>
                      ))}
                    </List>
                  </Card>
                )}

                {/* Performance Metrics */}
                {section.lighthouseScore && (
                  <Card
                    padding="lg"
                    radius="md"
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Text size="md" fw={600} mb="md" c={commonColors.accentPrimary}>
                      🚀 Performance Metrics
                    </Text>
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
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Text size="md" fw={600} mb="md" c={commonColors.accentPrimary}>
                      ⚡ Core Web Vitals
                    </Text>
                    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} spacing="md">
                      {Object.entries(section.coreWebVitals).map(([vital, value]) => (
                        <Box
                          key={vital}
                          p="md"
                          style={{
                            background: commonColors.backgroundModal,
                            border: `1px solid ${commonColors.borderPrimary}`,
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
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color={commonColors.accentPrimary}
                        variant="gradient"
                        gradient={{
                          from: commonColors.accentSecondary,
                          to: commonColors.accentPrimary,
                        }}
                        size="md"
                        radius="xl"
                      >
                        🏗️
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
                            color={commonColors.textSecondary}
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
                    <Stack gap="md">
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
                              <Badge
                                key={component}
                                size="md"
                                variant="light"
                                color={commonColors.accentPrimary}
                                radius="xl"
                                style={{
                                  fontWeight: 600,
                                  textTransform: 'none',
                                  background: commonColors.accentSecondary,
                                  color: commonColors.accentPrimary,
                                  border: `1px solid ${commonColors.accentPrimary}`,
                                  transition: 'all 0.2s ease-in-out',
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.transform = 'scale(1.05)';
                                  e.currentTarget.style.background = commonColors.accentPrimary;
                                  e.currentTarget.style.color = commonColors.backgroundCard;
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.transform = 'scale(1)';
                                  e.currentTarget.style.background = commonColors.accentSecondary;
                                  e.currentTarget.style.color = commonColors.accentPrimary;
                                }}
                              >
                                {component}
                              </Badge>
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
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color={commonColors.accentPrimary}
                        variant="gradient"
                        gradient={{
                          from: commonColors.accentSecondary,
                          to: commonColors.accentPrimary,
                        }}
                        size="md"
                        radius="xl"
                      >
                        🚀
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
                            color={commonColors.textSecondary}
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
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                      {section.deploymentFrequency && (
                        <Card
                          padding="md"
                          radius="md"
                          withBorder
                          style={{
                            background: colorCombinations.earthGradientModal,
                            border: `1px solid ${commonColors.borderEarth}`,
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
                          padding="md"
                          radius="md"
                          withBorder
                          style={{
                            background: colorCombinations.primaryGradientModal,
                            border: `1px solid ${commonColors.borderPrimaryColor}`,
                          }}
                        >
                          <Text size="sm" c={commonColors.textSecondary} fw={600} mb="xs">
                            Lead Time
                          </Text>
                          <Text size="lg" fw={800} c="pink">
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
                    withBorder
                    style={{
                      background: commonColors.backgroundCard,
                      border: `1px solid ${commonColors.borderPrimary}`,
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
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color={commonColors.accentPrimary}
                        variant="gradient"
                        gradient={{
                          from: commonColors.accentSecondary,
                          to: commonColors.accentPrimary,
                        }}
                        size="md"
                        radius="xl"
                      >
                        📸
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
                            color={commonColors.textSecondary}
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
                    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="md">
                      {section.screenshots.map((screenshot: string, index: number) => (
                        <Box
                          key={index}
                          style={{
                            position: 'relative',
                            height: '120px',
                            borderRadius: 'var(--mantine-radius-sm)',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: `1px solid ${commonColors.borderPrimary}`,
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
        size="50%"
        centered
        title="Technical Screenshot"
        styles={{
          content: {
            background: commonColors.backgroundModal,
            border: `1px solid ${commonColors.borderModal}`,
            boxShadow: `0 20px 25px ${commonColors.shadowHeavy}`,
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
