'use client';

import {
  Modal,
  Text,
  Badge,
  Group,
  Stack,
  Box,
  ThemeIcon,
  List,
  SimpleGrid,
  Tabs,
  Image,
  Alert,
  Progress,
  Title,
  Card,
  Tooltip,
} from '@mantine/core';
import {
  IconChartBar,
  IconShield,
  IconRocket,
  IconGauge,
  IconBuilding,
  IconZoomIn,
  IconAlertCircle,
} from '@tabler/icons-react';
import { useState, memo, useEffect, useMemo } from 'react';
import { Project } from '@/lib/projects';

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
      <Modal opened={opened} onClose={onClose} title="Technical Details" size="lg" centered>
        <Alert icon={<IconAlertCircle size={16} />} color="blue" variant="light">
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
        overlayProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
          },
        }}
        title={
          <Box>
            <Group gap="sm" align="flex-start" mb="md" wrap="wrap">
              <ThemeIcon
                color="sakura"
                variant="gradient"
                gradient={{ from: 'pink', to: 'red' }}
                size="md"
                radius="xl"
                style={{
                  boxShadow: '0 8px 32px rgba(244, 67, 54, 0.25)',
                  flexShrink: 0,
                }}
              >
                {getTechnicalIcon(activeTab || 'analytics')}
              </ThemeIcon>
              <Box style={{ flex: 1, minWidth: '0', overflow: 'hidden' }}>
                <Title
                  order={1}
                  c="dark"
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
                  size="sm"
                  c="dimmed"
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
                background: 'white',
                padding: '0',
                margin: '0 -1rem',
                borderBottom: '4px solid #E9ECEF',
                display: 'flex',
                justifyContent: 'center',
                width: 'calc(100% + 2rem)',
                minHeight: '44px',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              {technicalSections.map(({ key, icon }) => (
                <Box
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    padding: 'var(--mantine-spacing-xs) var(--mantine-spacing-sm)',
                    fontSize: 'var(--mantine-font-size-xs)',
                    color:
                      activeTab === key
                        ? 'var(--mantine-color-sakura-3)'
                        : 'var(--mantine-color-gray-6)',
                    background: activeTab === key ? 'var(--mantine-color-sakura-0)' : 'transparent',
                    flex: '1 1 0',
                    minWidth: '0',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTop:
                      activeTab === key
                        ? '2px solid var(--mantine-color-sakura-3)'
                        : '2px solid transparent',
                    borderLeft: '1px solid var(--mantine-color-gray-2)',
                    borderRight: '1px solid var(--mantine-color-gray-2)',
                    borderBottom: 'none',
                    cursor: 'pointer',
                    height: '100%',
                    minHeight: '44px',
                    whiteSpace: 'nowrap',
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
        size="xl"
        centered
        styles={{
          header: {
            background: 'white',
            borderBottom: 'none',
            padding:
              'var(--mantine-spacing-xl) var(--mantine-spacing-md) 0 var(--mantine-spacing-md)',
            marginBottom: 0,
            position: 'relative',
            zIndex: 100,
            overflow: 'hidden',
          },
          body: {
            padding: 'var(--mantine-spacing-md)',
            background: 'var(--mantine-color-gray-0)',
            maxHeight: '70vh',
            minHeight: '400px',
            overflowY: 'auto',
          },
          content: {
            borderRadius: 'var(--mantine-radius-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--mantine-shadow-xl)',
            border: '1px solid var(--mantine-color-gray-2)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1000,
            position: 'relative',
          },
        }}
      >
        <Tabs value={activeTab} onChange={setActiveTab} variant="pills" color="sakura">
          {technicalSections.map(({ key, section }) => (
            <Tabs.Panel key={key} value={key} pt="xl">
              <Stack gap="xl">
                {/* Overview Card */}
                <Card
                  padding="xl"
                  radius="lg"
                  withBorder
                  style={{
                    background: 'white',
                    border: '1px solid #E9ECEF',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    minHeight: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Group gap="lg" mb="md">
                    <ThemeIcon
                      color="sakura"
                      variant="gradient"
                      gradient={{ from: 'pink', to: 'red' }}
                      size="lg"
                      radius="xl"
                      style={{
                        boxShadow: '0 4px 16px rgba(244, 67, 54, 0.2)',
                      }}
                    >
                      {getTechnicalIcon(key)}
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Title order={3} c="dark" fw={700} mb="xs">
                        {key === 'cicd' ? 'CI/CD' : key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                        Overview
                      </Title>
                      <Text size="md" c="dimmed" lh={1.6}>
                        {section.description}
                      </Text>
                    </Box>
                  </Group>
                </Card>

                {/* Metrics Display */}
                {shouldShowSection(section, 'metrics') && (
                  <Card
                    padding="xl"
                    radius="lg"
                    withBorder
                    style={{
                      background: 'white',
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color="sakura"
                        variant="gradient"
                        gradient={{ from: 'pink', to: 'red' }}
                        size="md"
                        radius="xl"
                      >
                        📊
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c="dark">
                          Key Metrics
                        </Title>
                        <Tooltip
                          label="Performance indicators - visitor counts, session duration, and engagement metrics."
                          multiline
                          w={300}
                          withArrow
                        >
                          <ThemeIcon
                            color="gray"
                            variant="light"
                            size="sm"
                            radius="xl"
                            style={{ cursor: 'help' }}
                          >
                            ?
                          </ThemeIcon>
                        </Tooltip>
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
                            background: '#FAFBFC',
                            border: '1px solid #E9ECEF',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            cursor: 'default',
                          }}
                          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            e.currentTarget.style.borderColor = '#F44336';
                          }}
                          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = '#E9ECEF';
                          }}
                        >
                          <Text
                            size="xs"
                            c="dimmed"
                            tt="uppercase"
                            fw={600}
                            mb="xs"
                            style={{ letterSpacing: '0.5px' }}
                          >
                            {metricKey.replace(/([A-Z])/g, ' $1').trim()}
                          </Text>
                          <Text size="xl" fw={800} c="sakura">
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
                    radius="lg"
                    withBorder
                    style={{
                      background: 'white',
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <Group gap="md" mb="md">
                      <ThemeIcon
                        color="sakura"
                        variant="gradient"
                        gradient={{ from: 'pink', to: 'red' }}
                        size="md"
                        radius="xl"
                      >
                        🛠️
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c="dark">
                          Tools & Technologies
                        </Title>
                        <Tooltip
                          label="Programming languages, frameworks, and tools used to build this project."
                          multiline
                          w={300}
                          withArrow
                        >
                          <ThemeIcon
                            color="gray"
                            variant="light"
                            size="sm"
                            radius="xl"
                            style={{ cursor: 'help' }}
                          >
                            ?
                          </ThemeIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                    <Group gap="sm">
                      {section.tools.map((tool: string) => (
                        <Badge
                          key={tool}
                          size="md"
                          variant="light"
                          color="sakura"
                          radius="xl"
                          style={{
                            fontWeight: 500,
                            textTransform: 'none',
                            border: '1px solid #FFCDD2',
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
                    radius="lg"
                    withBorder
                    style={{
                      background: 'white',
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <Group gap="md" mb="md">
                      <ThemeIcon
                        color="sakura"
                        variant="gradient"
                        gradient={{ from: 'pink', to: 'red' }}
                        size="md"
                        radius="xl"
                      >
                        📊
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c="dark">
                          System Health
                        </Title>
                        <Tooltip
                          label="Reliability metrics - uptime percentage and error rates to ensure stable operation."
                          multiline
                          w={300}
                          withArrow
                        >
                          <ThemeIcon
                            color="gray"
                            variant="light"
                            size="sm"
                            radius="xl"
                            style={{ cursor: 'help' }}
                          >
                            ?
                          </ThemeIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                      {section.uptime && (
                        <Card
                          padding="md"
                          radius="md"
                          withBorder
                          style={{
                            background: 'linear-gradient(135deg, #E8F5E8, #F0F8F0)',
                            border: '1px solid #C8E6C9',
                          }}
                        >
                          <Text size="sm" c="dimmed" fw={600} mb="xs">
                            Uptime
                          </Text>
                          <Text size="xl" fw={800} c="green">
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
                            background: 'linear-gradient(135deg, #FFF3E0, #FFF8E1)',
                            border: '1px solid #FFCC02',
                          }}
                        >
                          <Text size="sm" c="dimmed" fw={600} mb="xs">
                            Error Rate
                          </Text>
                          <Text size="xl" fw={800} c="orange">
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
                    radius="lg"
                    withBorder
                    style={{
                      background: 'white',
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color="sakura"
                        variant="gradient"
                        gradient={{ from: 'pink', to: 'red' }}
                        size="md"
                        radius="xl"
                      >
                        ⚡
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c="dark">
                          CI/CD Workflows
                        </Title>
                        <Tooltip
                          label="Automated processes for testing, building, and deploying code changes without manual intervention."
                          multiline
                          w={300}
                          withArrow
                        >
                          <ThemeIcon
                            color="gray"
                            variant="light"
                            size="sm"
                            radius="xl"
                            style={{ cursor: 'help' }}
                          >
                            ?
                          </ThemeIcon>
                        </Tooltip>
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
                            background: '#FAFBFC',
                            border: '1px solid #E9ECEF',
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            cursor: 'default',
                          }}
                          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                            e.currentTarget.style.borderColor = '#F44336';
                          }}
                          onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = '#E9ECEF';
                          }}
                        >
                          <Text size="md" fw={600} c="dark">
                            {workflow}
                          </Text>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </Card>
                )}

                {shouldShowSection(section, 'components') && (
                  <Box
                    style={{
                      background: 'linear-gradient(135deg, #FFF5F5, #F8F4F4)',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #FFCDD2',
                    }}
                  >
                    <Text size="md" fw={600} mb="md" c="sakura">
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
                  </Box>
                )}

                {/* Performance Metrics */}
                {section.lighthouseScore && (
                  <Box
                    style={{
                      background: 'linear-gradient(135deg, #FFF5F5, #F8F4F4)',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #FFCDD2',
                    }}
                  >
                    <Text size="md" fw={600} mb="md" c="sakura">
                      🚀 Performance Metrics
                    </Text>
                    <Box>
                      <Group justify="space-between" mb="sm">
                        <Text size="sm" fw={500}>
                          Lighthouse Score
                        </Text>
                        <Text size="lg" fw={700} c="sakura">
                          {section.lighthouseScore}
                        </Text>
                      </Group>
                      <Progress
                        value={section.lighthouseScore}
                        color={
                          section.lighthouseScore >= 90
                            ? 'green'
                            : section.lighthouseScore >= 70
                              ? 'yellow'
                              : 'red'
                        }
                        size="lg"
                        radius="xl"
                        style={{
                          height: '12px',
                        }}
                      />
                    </Box>
                  </Box>
                )}

                {/* Core Web Vitals */}
                {section.coreWebVitals && (
                  <Box
                    style={{
                      background: 'linear-gradient(135deg, #FFF5F5, #F8F4F4)',
                      padding: '1rem',
                      borderRadius: '12px',
                      border: '1px solid #FFCDD2',
                    }}
                  >
                    <Text size="md" fw={600} mb="md" c="sakura">
                      ⚡ Core Web Vitals
                    </Text>
                    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3 }} spacing="md">
                      {Object.entries(section.coreWebVitals).map(([vital, value]) => (
                        <Box
                          key={vital}
                          p="md"
                          style={{
                            background: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid #FFCDD2',
                            borderRadius: '12px',
                            textAlign: 'center',
                            transition: 'transform 0.2s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(244, 67, 54, 0.15)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <Text size="xs" c="dimmed" tt="uppercase" fw={600} mb="xs">
                            {vital}
                          </Text>
                          <Text size="xl" fw={700} c="sakura">
                            {String(value)}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                )}

                {/* Architecture Data */}
                {shouldShowSection(section, 'architecture') && (
                  <Card
                    padding="xl"
                    radius="lg"
                    withBorder
                    style={{
                      background: 'white',
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color="sakura"
                        variant="gradient"
                        gradient={{ from: 'pink', to: 'red' }}
                        size="md"
                        radius="xl"
                      >
                        🏗️
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c="dark">
                          Architecture & Deployment
                        </Title>
                        <Tooltip
                          label="Technical blueprint and deployment strategy - the foundation and delivery system."
                          multiline
                          w={300}
                          withArrow
                        >
                          <ThemeIcon
                            color="gray"
                            variant="light"
                            size="sm"
                            radius="xl"
                            style={{ cursor: 'help' }}
                          >
                            ?
                          </ThemeIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                    <Stack gap="md">
                      {section.components && section.components.length > 0 && (
                        <Box>
                          <Text size="sm" c="dimmed" fw={600} mb="sm">
                            Key Components
                          </Text>
                          <Group gap="sm">
                            {section.components.map((component: string) => (
                              <Badge
                                key={component}
                                size="md"
                                variant="light"
                                color="sakura"
                                radius="xl"
                                style={{
                                  fontWeight: 500,
                                  textTransform: 'none',
                                  border: '1px solid #FFCDD2',
                                }}
                              >
                                {component}
                              </Badge>
                            ))}
                          </Group>
                        </Box>
                      )}
                      {section.deployment && (
                        <Box>
                          <Text size="sm" c="dimmed" fw={600} mb="sm">
                            Deployment
                          </Text>
                          <Text size="md" fw={600} c="dark">
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
                    radius="lg"
                    withBorder
                    style={{
                      background: 'white',
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color="sakura"
                        variant="gradient"
                        gradient={{ from: 'pink', to: 'red' }}
                        size="md"
                        radius="xl"
                      >
                        🚀
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c="dark">
                          Deployment Metrics
                        </Title>
                        <Tooltip
                          label="Release frequency and speed metrics - how often and how quickly updates are deployed."
                          multiline
                          w={300}
                          withArrow
                        >
                          <ThemeIcon
                            color="gray"
                            variant="light"
                            size="sm"
                            radius="xl"
                            style={{ cursor: 'help' }}
                          >
                            ?
                          </ThemeIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                      {section.deploymentFrequency && (
                        <Card
                          padding="md"
                          radius="md"
                          withBorder
                          style={{
                            background: 'linear-gradient(135deg, #E8F5E8, #F0F8F0)',
                            border: '1px solid #C8E6C9',
                          }}
                        >
                          <Text size="sm" c="dimmed" fw={600} mb="xs">
                            Deployment Frequency
                          </Text>
                          <Text size="lg" fw={800} c="green">
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
                            background: 'linear-gradient(135deg, #E3F2FD, #F3E5F5)',
                            border: '1px solid #BBDEFB',
                          }}
                        >
                          <Text size="sm" c="dimmed" fw={600} mb="xs">
                            Lead Time
                          </Text>
                          <Text size="lg" fw={800} c="blue">
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
                    radius="lg"
                    withBorder
                    style={{
                      background: 'white',
                      border: '1px solid #E9ECEF',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                    }}
                  >
                    <Group gap="md" mb="lg">
                      <ThemeIcon
                        color="sakura"
                        variant="gradient"
                        gradient={{ from: 'pink', to: 'red' }}
                        size="md"
                        radius="xl"
                      >
                        📸
                      </ThemeIcon>
                      <Group gap="xs" align="center">
                        <Title order={4} fw={700} c="dark">
                          Screenshots & Visuals
                        </Title>
                        <Tooltip
                          label="Visual examples of technical systems - dashboards, monitoring tools, and behind-the-scenes interfaces."
                          multiline
                          w={300}
                          withArrow
                        >
                          <ThemeIcon
                            color="gray"
                            variant="light"
                            size="sm"
                            radius="xl"
                            style={{ cursor: 'help' }}
                          >
                            ?
                          </ThemeIcon>
                        </Tooltip>
                      </Group>
                    </Group>
                    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="md">
                      {section.screenshots.map((screenshot: string, index: number) => (
                        <Box
                          key={index}
                          style={{
                            position: 'relative',
                            height: '120px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '1px solid #E9ECEF',
                            transition: 'all 0.2s ease',
                          }}
                          onClick={() => setSelectedImage(screenshot)}
                          onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
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
