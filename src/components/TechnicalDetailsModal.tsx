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
  Center,
  Loader,
  Alert,
  Progress,
  Divider,
  Title,
  Button,
  ScrollArea,
  Card,
} from '@mantine/core';
import {
  IconChartBar,
  IconShield,
  IconRocket,
  IconGauge,
  IconBuilding,
  IconZoomIn,
  IconX,
  IconAlertCircle,
  IconExternalLink,
  IconBrandGithub,
} from '@tabler/icons-react';
import { useState, memo } from 'react';
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

const TechnicalDetailsModal = memo(
  ({ project, opened, onClose }: TechnicalDetailsModalProps) => {
    const [activeTab, setActiveTab] = useState<string | null>('analytics');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    if (!project.technicalDetails) {
      return (
        <Modal
          opened={opened}
          onClose={onClose}
          title="Technical Details"
          size="lg"
          centered
        >
          <Alert
            icon={<IconAlertCircle size={16} />}
            color="blue"
            variant="light"
          >
            Technical details coming soon...
          </Alert>
        </Modal>
      );
    }

    const technicalSections = Object.entries(project.technicalDetails)
      .filter(([key]) => ['analytics', 'monitoring', 'cicd'].includes(key))
      .map(([key, section]) => ({
        key,
        section,
        icon: getTechnicalIcon(key),
      }));

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
              <Group gap="lg" mb="md" align="flex-start">
                <ThemeIcon
                  color="sakura"
                  variant="gradient"
                  gradient={{ from: 'pink', to: 'red' }}
                  size="xl"
                  radius="xl"
                  style={{
                    boxShadow: '0 8px 32px rgba(244, 67, 54, 0.25)',
                  }}
                >
                  {getTechnicalIcon(activeTab || 'analytics')}
                </ThemeIcon>
                <Box style={{ flex: 1 }}>
                  <Title order={1} c="dark" fw={800} mb="xs" size="h2">
                    {project.title}
                  </Title>
                  <Text size="lg" c="dimmed" fw={500}>
                    Technical Deep Dive & Behind the Scenes
                  </Text>
                </Box>
              </Group>

              <Tabs
                value={activeTab}
                onChange={setActiveTab}
                variant="default"
                color="sakura"
              >
                <Tabs.List
                  style={{
                    background: 'transparent',
                    borderBottom: '2px solid #E9ECEF',
                    margin: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  {technicalSections.map(({ key, section, icon }) => (
                    <Tabs.Tab
                      key={key}
                      value={key}
                      leftSection={icon}
                      style={{
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                        padding: '16px 24px',
                        fontSize: '15px',
                        borderBottom: '3px solid transparent',
                        color: activeTab === key ? '#F44336' : '#6C757D',
                        background: 'transparent',
                        flex: 1,
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: 0,
                      }}
                    >
                      {key === 'cicd'
                        ? 'CI/CD'
                        : key.charAt(0).toUpperCase() + key.slice(1)}
                    </Tabs.Tab>
                  ))}
                </Tabs.List>
              </Tabs>
            </Box>
          }
          size="xl"
          centered
          styles={{
            header: {
              background: 'white',
              borderBottom: '1px solid #E9ECEF',
              padding: '2.5rem 2.5rem 1rem 2.5rem',
              marginBottom: 0,
              position: 'relative',
              zIndex: 100,
            },
            body: {
              padding: '1rem 2.5rem 2.5rem 2.5rem',
              background: '#FAFBFC',
              maxHeight: '70vh',
              overflowY: 'auto',
            },
            content: {
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              border: '1px solid #E9ECEF',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1000,
              position: 'relative',
            },
          }}
        >
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            variant="pills"
            color="sakura"
          >
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
                          {key === 'cicd'
                            ? 'CI/CD'
                            : key.charAt(0).toUpperCase() + key.slice(1)}{' '}
                          Overview
                        </Title>
                        <Text size="md" c="dimmed" lh={1.6}>
                          {section.description}
                        </Text>
                      </Box>
                    </Group>
                  </Card>

                  {/* Metrics Display */}
                  {section.metrics && (
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
                        <Title order={4} fw={700} c="dark">
                          Key Metrics
                        </Title>
                      </Group>
                      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
                        {Object.entries(section.metrics).map(
                          ([metricKey, value]) => (
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
                              onMouseEnter={(
                                e: React.MouseEvent<HTMLDivElement>
                              ) => {
                                e.currentTarget.style.transform =
                                  'translateY(-2px)';
                                e.currentTarget.style.boxShadow =
                                  '0 4px 12px rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.borderColor = '#F44336';
                              }}
                              onMouseLeave={(
                                e: React.MouseEvent<HTMLDivElement>
                              ) => {
                                e.currentTarget.style.transform =
                                  'translateY(0)';
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
                          )
                        )}
                      </SimpleGrid>
                    </Card>
                  )}

                  {/* Additional Data */}
                  {section.tools && (
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
                        <Title order={4} fw={700} c="dark">
                          Tools & Technologies
                        </Title>
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
                  {(section.uptime || section.errorRate) && (
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
                        <Title order={4} fw={700} c="dark">
                          System Health
                        </Title>
                      </Group>
                      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                        {section.uptime && (
                          <Card
                            padding="md"
                            radius="md"
                            withBorder
                            style={{
                              background:
                                'linear-gradient(135deg, #E8F5E8, #F0F8F0)',
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
                              background:
                                'linear-gradient(135deg, #FFF3E0, #FFF8E1)',
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

                  {section.workflows && (
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
                        <Title order={4} fw={700} c="dark">
                          CI/CD Workflows
                        </Title>
                      </Group>
                      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                        {section.workflows.map(
                          (workflow: string, index: number) => (
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
                              onMouseEnter={(
                                e: React.MouseEvent<HTMLDivElement>
                              ) => {
                                e.currentTarget.style.transform =
                                  'translateY(-2px)';
                                e.currentTarget.style.boxShadow =
                                  '0 4px 12px rgba(0, 0, 0, 0.08)';
                                e.currentTarget.style.borderColor = '#F44336';
                              }}
                              onMouseLeave={(
                                e: React.MouseEvent<HTMLDivElement>
                              ) => {
                                e.currentTarget.style.transform =
                                  'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = '#E9ECEF';
                              }}
                            >
                              <Text size="md" fw={600} c="dark">
                                {workflow}
                              </Text>
                            </Card>
                          )
                        )}
                      </SimpleGrid>
                    </Card>
                  )}

                  {section.components && (
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
                        {section.components.map(
                          (component: string, index: number) => (
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
                          )
                        )}
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
                      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
                        {Object.entries(section.coreWebVitals).map(
                          ([vital, value]) => (
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
                                e.currentTarget.style.transform =
                                  'translateY(-2px)';
                                e.currentTarget.style.boxShadow =
                                  '0 8px 25px rgba(244, 67, 54, 0.15)';
                              }}
                              onMouseLeave={e => {
                                e.currentTarget.style.transform =
                                  'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              <Text
                                size="xs"
                                c="dimmed"
                                tt="uppercase"
                                fw={600}
                                mb="xs"
                              >
                                {vital}
                              </Text>
                              <Text size="xl" fw={700} c="sakura">
                                {String(value)}
                              </Text>
                            </Box>
                          )
                        )}
                      </SimpleGrid>
                    </Box>
                  )}

                  {/* Screenshots Section for Analytics, Monitoring and CI/CD */}
                  {(key === 'analytics' ||
                    key === 'monitoring' ||
                    key === 'cicd') &&
                    section.screenshots &&
                    section.screenshots.length > 0 && (
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
                          <Title order={4} fw={700} c="dark">
                            Screenshots & Visuals
                          </Title>
                        </Group>
                        <SimpleGrid
                          cols={{ base: 2, sm: 3, md: 4 }}
                          spacing="md"
                        >
                          {section.screenshots.map(
                            (screenshot: string, index: number) => (
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
                                onMouseEnter={(
                                  e: React.MouseEvent<HTMLDivElement>
                                ) => {
                                  e.currentTarget.style.transform =
                                    'scale(1.05)';
                                  e.currentTarget.style.boxShadow =
                                    '0 4px 12px rgba(0, 0, 0, 0.15)';
                                }}
                                onMouseLeave={(
                                  e: React.MouseEvent<HTMLDivElement>
                                ) => {
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
                                  onMouseEnter={(
                                    e: React.MouseEvent<HTMLDivElement>
                                  ) => {
                                    e.currentTarget.style.opacity = '1';
                                  }}
                                  onMouseLeave={(
                                    e: React.MouseEvent<HTMLDivElement>
                                  ) => {
                                    e.currentTarget.style.opacity = '0';
                                  }}
                                >
                                  <ThemeIcon
                                    color="white"
                                    variant="filled"
                                    size="lg"
                                    radius="xl"
                                  >
                                    <IconZoomIn size={20} />
                                  </ThemeIcon>
                                </Box>
                              </Box>
                            )
                          )}
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
            <Image
              src={`/images/technical/${selectedImage}`}
              alt="Technical screenshot"
            />
          )}
        </Modal>
      </>
    );
  }
);

TechnicalDetailsModal.displayName = 'TechnicalDetailsModal';

export default TechnicalDetailsModal;
