'use client';

import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Box,
  ThemeIcon,
  ActionIcon,
  Tooltip,
  Button,
  Image,
  Center,
} from '@mantine/core';
import {
  IconCode,
  IconExternalLink,
  IconBrandGithub,
  IconBrain,
  IconCalendar,
  IconSettings,
} from '@tabler/icons-react';
import { useState, memo } from 'react';
import { Project } from '@/lib/projects';
import { getProjectScreenshots } from '@/lib/screenshot';
import TechnicalDetailsModal from './TechnicalDetailsModal';

interface ExpandableProjectCardProps {
  project: Project;
  type: 'vibe-coded' | 'standard-work';
}

const getProjectIcon = (type: Project['type']) => {
  return type === 'vibe-coded' ? (
    <IconBrain size={20} />
  ) : (
    <IconCode size={20} />
  );
};

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'completed':
      return 'green';
    case 'in-progress':
      return 'yellow';
    case 'planned':
      return 'blue';
    default:
      return 'gray';
  }
};

const ExpandableProjectCard = memo(
  ({ project, type }: ExpandableProjectCardProps) => {
    const [modalOpened, setModalOpened] = useState(false);
    const screenshots = getProjectScreenshots(project);

    const cardColor = type === 'vibe-coded' ? '#F8F4F4' : '#F5F5F5';
    const accentColor = type === 'vibe-coded' ? '#F44336' : '#228BE6';

    return (
      <>
        <Card
          p="lg"
          withBorder
          radius="lg"
          h="100%"
          style={{
            background: cardColor,
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
          }}
        >
          <Stack gap="md" h="100%">
            {/* Project Header */}
            <Group justify="space-between" align="flex-start">
              <Group gap="sm">
                <ThemeIcon
                  color={type === 'vibe-coded' ? 'sakura' : 'blue'}
                  variant="light"
                >
                  {getProjectIcon(type)}
                </ThemeIcon>
                <Box>
                  <Text fw={600} size="lg">
                    {project.title}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {project.category}
                  </Text>
                </Box>
              </Group>
              <Badge color={getStatusColor(project.status)} size="sm">
                {project.status}
              </Badge>
            </Group>

            {/* Project Thumbnail */}
            <Box
              component="a"
              href={project.liveUrl || project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: 'relative',
                height: '120px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${accentColor}, ${accentColor}80)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {screenshots.thumbnail ? (
                <Image
                  src={screenshots.thumbnail}
                  alt={project.title}
                  height={120}
                />
              ) : (
                <Center h={120} c="white">
                  <Stack align="center" gap="xs">
                    <Text size="lg" fw={600}>
                      {project.title}
                    </Text>
                    <Text size="sm" opacity={0.8}>
                      Click to view
                    </Text>
                  </Stack>
                </Center>
              )}
            </Box>

            {/* Project Description */}
            <Text size="sm" c="dimmed" lineClamp={3}>
              {project.description}
            </Text>

            {/* Technologies */}
            <Group gap="xs" wrap="wrap">
              {project.technologies.slice(0, 4).map(tech => (
                <Badge
                  key={tech}
                  size="sm"
                  variant="outline"
                  color={type === 'vibe-coded' ? 'sakura' : 'blue'}
                >
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 4 && (
                <Badge size="sm" variant="light" color="gray">
                  +{project.technologies.length - 4} more
                </Badge>
              )}
            </Group>

            {/* AI Tools (for vibe-coded projects) */}
            {type === 'vibe-coded' && project.aiTools && (
              <Box>
                <Text size="xs" c="dimmed" mb="xs">
                  AI Tools Used:
                </Text>
                <Group gap="xs">
                  {project.aiTools.map(tool => (
                    <Badge key={tool} size="xs" variant="filled" color="sakura">
                      {tool}
                    </Badge>
                  ))}
                </Group>
              </Box>
            )}

            {/* Technical Details Button */}
            {project.enableTechnicalDetails && (
              <Button
                variant="light"
                color={type === 'vibe-coded' ? 'sakura' : 'blue'}
                size="sm"
                fullWidth
                leftSection={<IconSettings size={16} />}
                onClick={() => setModalOpened(true)}
              >
                View Technical Details
              </Button>
            )}

            {/* Project Footer */}
            <Group justify="space-between" mt="auto">
              <Text size="xs" c="dimmed">
                <IconCalendar size={12} style={{ marginRight: 4 }} />
                {project.timeline}
              </Text>
              <Group gap="xs">
                {project.liveUrl && (
                  <Tooltip label="View Live Site">
                    <ActionIcon
                      component="a"
                      href={project.liveUrl}
                      target="_blank"
                      color={type === 'vibe-coded' ? 'sakura' : 'blue'}
                      variant="light"
                      size="sm"
                    >
                      <IconExternalLink size={14} />
                    </ActionIcon>
                  </Tooltip>
                )}
                {project.githubUrl && (
                  <Tooltip label="View Source Code">
                    <ActionIcon
                      component="a"
                      href={project.githubUrl}
                      target="_blank"
                      color={type === 'vibe-coded' ? 'sakura' : 'blue'}
                      variant="light"
                      size="sm"
                    >
                      <IconBrandGithub size={14} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Group>
            </Group>
          </Stack>
        </Card>

        {/* Technical Details Modal */}
        <TechnicalDetailsModal
          project={project}
          opened={modalOpened}
          onClose={() => setModalOpened(false)}
        />
      </>
    );
  }
);

ExpandableProjectCard.displayName = 'ExpandableProjectCard';

export default ExpandableProjectCard;
