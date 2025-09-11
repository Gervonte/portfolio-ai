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

    const technicalSections = Object.entries(project.technicalDetails).map(
      ([key, section]) => ({
        key,
        section,
        icon: getTechnicalIcon(key),
      })
    );

    return (
      <>
        <Modal
          opened={opened}
          onClose={onClose}
          title={
            <Group gap="sm">
              <ThemeIcon color="sakura" variant="light">
                {getTechnicalIcon(activeTab || 'analytics')}
              </ThemeIcon>
              <Box>
                <Title order={3}>{project.title}</Title>
                <Text size="sm" c="dimmed">
                  Behind the Scenes
                </Text>
              </Box>
            </Group>
          }
          size="xl"
          centered
          scrollAreaComponent={ScrollArea.Autosize}
          styles={{
            header: {
              borderBottom: '1px solid #e9ecef',
              paddingBottom: '1rem',
            },
          }}
        >
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              {technicalSections.map(({ key, section, icon }) => (
                <Tabs.Tab key={key} value={key} leftSection={icon}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Tabs.Tab>
              ))}
            </Tabs.List>

            {technicalSections.map(({ key, section }) => (
              <Tabs.Panel key={key} value={key} pt="md">
                <Stack gap="md">
                  <Text size="sm" c="dimmed">
                    {section.description}
                  </Text>

                  {/* Metrics Display */}
                  {section.metrics && (
                    <Box>
                      <Text size="sm" fw={500} mb="sm">
                        Key Metrics
                      </Text>
                      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
                        {Object.entries(section.metrics).map(
                          ([metricKey, value]) => (
                            <Box
                              key={metricKey}
                              p="sm"
                              style={{
                                border: '1px solid #e9ecef',
                                borderRadius: '8px',
                              }}
                            >
                              <Text
                                size="xs"
                                c="dimmed"
                                tt="uppercase"
                                fw={500}
                              >
                                {metricKey.replace(/([A-Z])/g, ' $1').trim()}
                              </Text>
                              <Text size="lg" fw={700} c="sakura">
                                {value}
                              </Text>
                            </Box>
                          )
                        )}
                      </SimpleGrid>
                    </Box>
                  )}

                  {/* Additional Data */}
                  {section.tools && (
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Tools & Technologies:
                      </Text>
                      <Group gap="xs">
                        {section.tools.map((tool: string) => (
                          <Badge
                            key={tool}
                            size="sm"
                            variant="outline"
                            color="sakura"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </Group>
                    </Box>
                  )}

                  {section.workflows && (
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Workflows:
                      </Text>
                      <List size="sm" spacing="xs">
                        {section.workflows.map(
                          (workflow: string, index: number) => (
                            <List.Item key={index}>{workflow}</List.Item>
                          )
                        )}
                      </List>
                    </Box>
                  )}

                  {section.components && (
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Components:
                      </Text>
                      <List size="sm" spacing="xs">
                        {section.components.map(
                          (component: string, index: number) => (
                            <List.Item key={index}>{component}</List.Item>
                          )
                        )}
                      </List>
                    </Box>
                  )}

                  {/* Performance Metrics */}
                  {section.lighthouseScore && (
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Lighthouse Score: {section.lighthouseScore}
                      </Text>
                      <Progress
                        value={section.lighthouseScore}
                        color={
                          section.lighthouseScore >= 90
                            ? 'green'
                            : section.lighthouseScore >= 70
                              ? 'yellow'
                              : 'red'
                        }
                        size="sm"
                      />
                    </Box>
                  )}

                  {/* Core Web Vitals */}
                  {section.coreWebVitals && (
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Core Web Vitals:
                      </Text>
                      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="sm">
                        {Object.entries(section.coreWebVitals).map(
                          ([vital, value]) => (
                            <Box
                              key={vital}
                              p="sm"
                              style={{
                                border: '1px solid #e9ecef',
                                borderRadius: '8px',
                              }}
                            >
                              <Text
                                size="xs"
                                c="dimmed"
                                tt="uppercase"
                                fw={500}
                              >
                                {vital}
                              </Text>
                              <Text size="md" fw={600}>
                                {value}
                              </Text>
                            </Box>
                          )
                        )}
                      </SimpleGrid>
                    </Box>
                  )}

                  {/* Screenshots Gallery */}
                  {section.screenshots && section.screenshots.length > 0 && (
                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Screenshots:
                      </Text>
                      <SimpleGrid cols={{ base: 2, sm: 3 }} spacing="sm">
                        {section.screenshots.map(
                          (screenshot: string, index: number) => (
                            <Box
                              key={index}
                              style={{
                                position: 'relative',
                                cursor: 'pointer',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '1px solid #e9ecef',
                              }}
                              onClick={() => setSelectedImage(screenshot)}
                            >
                              <Image
                                src={`/images/technical/${screenshot}`}
                                alt={`${key} screenshot ${index + 1}`}
                                height={120}
                                fallback={
                                  <Center h={120} c="dimmed">
                                    <Stack align="center" gap="xs">
                                      <IconZoomIn size={24} />
                                      <Text size="xs">Click to view</Text>
                                    </Stack>
                                  </Center>
                                }
                              />
                              <Box
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  background: 'rgba(0,0,0,0.1)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  opacity: 0,
                                  transition: 'opacity 0.2s ease',
                                }}
                                onMouseEnter={e => {
                                  e.currentTarget.style.opacity = '1';
                                }}
                                onMouseLeave={e => {
                                  e.currentTarget.style.opacity = '0';
                                }}
                              >
                                <IconZoomIn size={24} color="white" />
                              </Box>
                            </Box>
                          )
                        )}
                      </SimpleGrid>
                    </Box>
                  )}

                  {/* Project Links */}
                  <Divider />
                  <Group justify="space-between">
                    <Text size="sm" c="dimmed">
                      Project Links:
                    </Text>
                    <Group gap="xs">
                      {project.liveUrl && (
                        <Button
                          component="a"
                          href={project.liveUrl}
                          target="_blank"
                          leftSection={<IconExternalLink size={14} />}
                          size="xs"
                          variant="light"
                          color="sakura"
                        >
                          Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          component="a"
                          href={project.githubUrl}
                          target="_blank"
                          leftSection={<IconBrandGithub size={14} />}
                          size="xs"
                          variant="light"
                          color="sakura"
                        >
                          Source Code
                        </Button>
                      )}
                    </Group>
                  </Group>
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
              fallback={
                <Center h={400}>
                  <Stack align="center" gap="md">
                    <Loader size="lg" />
                    <Text>Loading image...</Text>
                  </Stack>
                </Center>
              }
            />
          )}
        </Modal>
      </>
    );
  }
);

TechnicalDetailsModal.displayName = 'TechnicalDetailsModal';

export default TechnicalDetailsModal;
