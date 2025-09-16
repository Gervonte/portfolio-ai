'use client';

import { commonColors, earth, sakura, warm } from '@/lib/colors';
import { Project } from '@/lib/projects';
import { getProjectScreenshots } from '@/lib/screenshot';
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';
import {
  IconBrain,
  IconBrandGithub,
  IconCalendar,
  IconCode,
  IconExternalLink,
  IconSettings,
} from '@tabler/icons-react';
import { memo, useState } from 'react';
import BadgeWithTooltip from './BadgeWithTooltip';
import { MobileTooltip } from './MobileTooltip';
import TechnicalDetailsModal from './TechnicalDetailsModal';
import { TouchActionIcon } from './TouchActionIcon';

interface ExpandableProjectCardProps {
  project: Project;
  type: 'vibe-coded' | 'standard-work';
}

const getProjectIcon = (type: Project['type']) => {
  return type === 'vibe-coded' ? <IconBrain size={20} /> : <IconCode size={20} />;
};

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'completed':
      return 'sakura';
    case 'in-progress':
      return 'pink';
    case 'planned':
      return 'gray';
    default:
      return 'gray';
  }
};

const ExpandableProjectCard = memo(({ project, type }: ExpandableProjectCardProps) => {
  const [modalOpened, setModalOpened] = useState(false);
  const screenshots = getProjectScreenshots(project);

  const cardColor = type === 'vibe-coded' ? sakura[0] : warm[1];
  const accentColor = type === 'vibe-coded' ? commonColors.accentPrimary : earth[3]; // Brown for traditional work

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
              <ThemeIcon color={type === 'vibe-coded' ? 'sakura' : 'earth'} variant="light">
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
            <BadgeWithTooltip
              contextType="status"
              contextValue={project.status}
              color={getStatusColor(project.status)}
              size="sm"
            >
              {project.status}
            </BadgeWithTooltip>
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
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
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
          <Box>
            <Text size="xs" c="dimmed" mb="xs">
              Technologies:
            </Text>
            <Flex gap="xs" wrap="wrap" style={{ rowGap: '4px' }}>
              {project.technologies.slice(0, 4).map(tech => (
                <BadgeWithTooltip
                  key={tech}
                  contextType="technology"
                  contextValue={tech}
                  size="sm"
                  variant="outline"
                  color={type === 'vibe-coded' ? 'sakura' : 'earth'}
                >
                  {tech}
                </BadgeWithTooltip>
              ))}
              {project.technologies.length > 4 && (
                <MobileTooltip
                  label={`Additional technologies: ${project.technologies.slice(4).join(', ')}`}
                  multiline
                  withArrow
                  withinPortal
                >
                  <Badge
                    size="sm"
                    variant="filled"
                    color={type === 'vibe-coded' ? 'sakura' : 'earth'}
                    style={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      opacity: 0.8,
                    }}
                  >
                    +{project.technologies.length - 4} more
                  </Badge>
                </MobileTooltip>
              )}
            </Flex>
          </Box>

          {/* AI Tools (for vibe-coded projects) */}
          {type === 'vibe-coded' && project.aiTools && (
            <Box>
              <Text size="xs" c="dimmed" mb="xs">
                AI Tools Used:
              </Text>
              <Flex gap="xs" wrap="wrap" style={{ rowGap: '4px' }}>
                {project.aiTools.map(tool => (
                  <BadgeWithTooltip
                    key={tool}
                    contextType="aiTool"
                    contextValue={tool}
                    size="xs"
                    variant="filled"
                    color="sakura"
                  >
                    {tool}
                  </BadgeWithTooltip>
                ))}
              </Flex>
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
                <TouchActionIcon
                  tooltip="View Live Site"
                  href={project.liveUrl}
                  target="_blank"
                  color={type === 'vibe-coded' ? 'sakura' : 'earth'}
                  variant="light"
                  size="sm"
                  aria-label="View Live Site"
                >
                  <IconExternalLink size={14} />
                </TouchActionIcon>
              )}
              {project.githubUrl && (
                <TouchActionIcon
                  tooltip="View Source Code"
                  href={project.githubUrl}
                  target="_blank"
                  color={type === 'vibe-coded' ? 'sakura' : 'earth'}
                  variant="light"
                  size="sm"
                  aria-label="View Source Code"
                >
                  <IconBrandGithub size={14} />
                </TouchActionIcon>
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
});

ExpandableProjectCard.displayName = 'ExpandableProjectCard';

export default ExpandableProjectCard;
