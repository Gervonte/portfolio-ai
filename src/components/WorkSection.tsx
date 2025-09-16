'use client';

import { colorCombinations } from '@/lib/colors';
import { getFeaturedProjects, getProjectsByType, projectsData, type Project } from '@/lib/projects';
import { getProjectScreenshots } from '@/lib/screenshot';
import {
  Badge,
  Box,
  Card,
  Container,
  Group,
  Image,
  List,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  //Paper,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconBrain,
  IconBrandGithub,
  //IconStar,
  IconCalendar,
  IconCode,
  IconExternalLink,
  //IconHeart,
  IconSparkles,
  IconTools,
} from '@tabler/icons-react';
import { memo, useMemo } from 'react';
import ExpandableProjectCard from './ExpandableProjectCard';
import { TouchActionIcon } from './TouchActionIcon';

// Get projects from metadata file

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

const getTypeColor = (type: Project['type']) => {
  return type === 'vibe-coded' ? 'sakura' : 'earth';
};

const WorkSection = memo(() => {
  const vibeCodedProjects = useMemo(() => getProjectsByType('vibe-coded'), []);
  const standardWorkProjects = useMemo(() => getProjectsByType('standard-work'), []);
  const featuredProjects = useMemo(() => getFeaturedProjects(), []);

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <Box ta="center" mb="xl">
          <Title
            order={1}
            size="h1"
            mb="md"
            style={{
              background: colorCombinations.sakuraGradient,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            My Work
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            A showcase of my projects, highlighting both AI-assisted development and traditional
            programming approaches
          </Text>
        </Box>

        {/* Featured Projects */}
        <Box>
          <Group justify="center" mb="xl">
            <Title order={2} ta="center">
              Featured Projects
            </Title>
          </Group>
          <Box
            style={{
              display: 'grid',
              gridTemplateColumns:
                featuredProjects.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '2rem',
              maxWidth: featuredProjects.length === 1 ? '600px' : 'none',
              margin: featuredProjects.length === 1 ? '0 auto' : '0',
            }}
          >
            {featuredProjects.map(project => {
              const screenshots = getProjectScreenshots(project);
              return (
                <Card key={project.id} p="lg" withBorder radius="lg" h="100%">
                  <Stack gap="md" h="100%">
                    {/* Project Thumbnail */}
                    <Box
                      component="a"
                      href={project.liveUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        position: 'relative',
                        height: '200px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: colorCombinations.sakuraGradient,
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
                      <Image
                        src={screenshots.card}
                        alt={`${project.title} preview`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center top',
                          transition: 'transform 0.3s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onError={e => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <Box
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'none',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: colorCombinations.sakuraGradient,
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      >
                        <ThemeIcon color="white" variant="filled" size="xl" radius="xl">
                          {getProjectIcon(project.type)}
                        </ThemeIcon>
                      </Box>

                      {/* Click indicator overlay */}
                      <Box
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'rgba(0, 0, 0, 0.7)',
                          borderRadius: '50%',
                          padding: '8px',
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
                        <IconExternalLink size={16} color="white" />
                      </Box>
                      <Badge
                        color={getTypeColor(project.type)}
                        variant="filled"
                        size="sm"
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                        }}
                      >
                        {project.type === 'vibe-coded' ? 'AI-Assisted' : 'Traditional'}
                      </Badge>
                    </Box>

                    <Group justify="space-between" align="flex-start">
                      <Group>
                        <ThemeIcon color={getTypeColor(project.type)} variant="light" size="lg">
                          {getProjectIcon(project.type)}
                        </ThemeIcon>
                        <Box>
                          <Title order={3} size="h4">
                            {project.title}
                          </Title>
                          <Text size="sm" c="dimmed">
                            {project.category}
                          </Text>
                        </Box>
                      </Group>
                      <Badge color={getStatusColor(project.status)} variant="light" size="sm">
                        {project.status}
                      </Badge>
                    </Group>

                    <Text size="md" lh={1.6}>
                      {project.longDescription}
                    </Text>

                    <Box>
                      <Text size="sm" fw={500} mb="xs">
                        Technologies:
                      </Text>
                      <Group gap="xs">
                        {project.technologies.map(tech => (
                          <Badge
                            key={tech}
                            size="sm"
                            variant="outline"
                            color={getTypeColor(project.type)}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </Group>
                    </Box>

                    {project.aiTools && (
                      <Box>
                        <Text size="sm" fw={500} mb="xs">
                          AI Tools Used:
                        </Text>
                        <Group gap="xs">
                          {project.aiTools.map(tool => (
                            <Badge
                              key={tool}
                              size="sm"
                              variant="filled"
                              color="sakura"
                              leftSection={<IconSparkles size={12} />}
                            >
                              {tool}
                            </Badge>
                          ))}
                        </Group>
                      </Box>
                    )}

                    <List size="sm" spacing="xs">
                      {project.achievements.slice(0, 3).map((achievement, idx) => (
                        <List.Item key={idx}>{achievement}</List.Item>
                      ))}
                    </List>

                    <Group justify="space-between" mt="auto">
                      <Group gap="xs">
                        <Text size="sm" c="dimmed">
                          <IconCalendar size={14} style={{ marginRight: 4 }} />
                          {project.timeline}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        {project.liveUrl && (
                          <TouchActionIcon
                            tooltip="View Live Demo"
                            href={project.liveUrl}
                            target="_blank"
                            color="sakura"
                            variant="light"
                            size="sm"
                            aria-label="View Live Demo"
                          >
                            <IconExternalLink size={16} />
                          </TouchActionIcon>
                        )}
                        {project.githubUrl && (
                          <TouchActionIcon
                            tooltip="View Source Code"
                            href={project.githubUrl}
                            target="_blank"
                            color="sakura"
                            variant="light"
                            size="sm"
                            aria-label="View Source Code"
                          >
                            <IconBrandGithub size={16} />
                          </TouchActionIcon>
                        )}
                      </Group>
                    </Group>
                  </Stack>
                </Card>
              );
            })}
          </Box>
        </Box>

        {/* Work Categories Tabs */}
        <Tabs defaultValue="vibe-coded" variant="pills" color="sakura">
          <Tabs.List justify="center" mb="xl">
            <Tabs.Tab value="vibe-coded" leftSection={<IconBrain size={16} />} fw={600}>
              Vibe Coded
            </Tabs.Tab>
            <Tabs.Tab value="standard-work" leftSection={<IconCode size={16} />} fw={600}>
              Traditional Work
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="vibe-coded">
            <Box>
              <Group justify="center" mb="xl">
                <Title order={2} ta="center">
                  Vibe Coded Projects
                </Title>
                <Badge
                  leftSection={<IconSparkles size={14} />}
                  color="sakura"
                  variant="light"
                  size="lg"
                  radius="xl"
                >
                  AI-Assisted Development
                </Badge>
              </Group>
              <Text ta="center" c="dimmed" mb="xl" maw={600} mx="auto">
                {projectsData.categories['vibe-coded'].description}
              </Text>
              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
                {vibeCodedProjects.map(project => (
                  <ExpandableProjectCard key={project.id} project={project} type="vibe-coded" />
                ))}
              </SimpleGrid>
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="standard-work">
            <Box>
              <Group justify="center" mb="xl">
                <Title order={2} ta="center">
                  Traditional Work Projects
                </Title>
                <Badge
                  leftSection={<IconTools size={14} />}
                  color="earth"
                  variant="light"
                  size="lg"
                  radius="xl"
                >
                  Traditional Development
                </Badge>
              </Group>
              <Text ta="center" c="dimmed" mb="xl" maw={600} mx="auto">
                {projectsData.categories['standard-work'].description}
              </Text>
              <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="xl">
                {standardWorkProjects.map(project => (
                  <ExpandableProjectCard key={project.id} project={project} type="standard-work" />
                ))}
              </SimpleGrid>
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
});

WorkSection.displayName = 'WorkSection';

export default WorkSection;
