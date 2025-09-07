'use client';

import {
  Container,
  Title,
  Text,
  Card,
  Badge,
  Group,
  Stack,
  Box,
  Paper,
  ThemeIcon,
  List,
  SimpleGrid,
  Tabs,
  Image,
  ActionIcon,
  Tooltip,
} from '@mantine/core';
import {
  IconCode,
  IconExternalLink,
  IconBrandGithub,
  IconBrain,
  IconTools,
  IconStar,
  IconCalendar,
  IconHeart,
  IconSparkles,
} from '@tabler/icons-react';
import {
  projectsData,
  getProjectsByType,
  getFeaturedProjects,
  type Project,
} from '@/lib/projects';
import { getProjectScreenshots } from '@/lib/screenshot';

// Get projects from metadata file

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
      return 'blue';
    case 'planned':
      return 'gray';
    default:
      return 'gray';
  }
};

const getTypeColor = (type: Project['type']) => {
  return type === 'vibe-coded' ? 'sakura' : 'blue';
};

export default function WorkSection() {
  const vibeCodedProjects = getProjectsByType('vibe-coded');
  const standardWorkProjects = getProjectsByType('standard-work');
  const featuredProjects = getFeaturedProjects();

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
              background: 'linear-gradient(135deg, #E91E63, #F8BBD9)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            My Work
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            A showcase of my projects, highlighting both AI-assisted development
            and traditional programming approaches
          </Text>
        </Box>

        {/* Featured Projects */}
        <Box>
          <Group justify="center" mb="xl">
            <Title order={2} ta="center">
              Featured Projects
            </Title>
            <Badge
              leftSection={<IconStar size={14} />}
              color="sakura"
              variant="light"
              size="lg"
              radius="xl"
            >
              Highlighted Work
            </Badge>
          </Group>
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
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
                        background: 'linear-gradient(135deg, #E91E63, #F8BBD9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow =
                          '0 8px 25px rgba(0,0,0,0.15)';
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
                          const fallback =
                            target.nextElementSibling as HTMLElement;
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
                          background:
                            'linear-gradient(135deg, #E91E63, #F8BBD9)',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                        }}
                      >
                        <ThemeIcon
                          color="white"
                          variant="filled"
                          size="xl"
                          radius="xl"
                        >
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
                        {project.type === 'vibe-coded'
                          ? 'AI-Assisted'
                          : 'Traditional'}
                      </Badge>
                    </Box>

                    <Group justify="space-between" align="flex-start">
                      <Group>
                        <ThemeIcon
                          color={getTypeColor(project.type)}
                          variant="light"
                          size="lg"
                        >
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
                      <Badge
                        color={getStatusColor(project.status)}
                        variant="light"
                        size="sm"
                      >
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
                      {project.achievements
                        .slice(0, 3)
                        .map((achievement, idx) => (
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
                          <Tooltip label="View Live Demo">
                            <ActionIcon
                              component="a"
                              href={project.liveUrl}
                              target="_blank"
                              color="sakura"
                              variant="light"
                              size="sm"
                            >
                              <IconExternalLink size={16} />
                            </ActionIcon>
                          </Tooltip>
                        )}
                        {project.githubUrl && (
                          <Tooltip label="View Source Code">
                            <ActionIcon
                              component="a"
                              href={project.githubUrl}
                              target="_blank"
                              color="sakura"
                              variant="light"
                              size="sm"
                            >
                              <IconBrandGithub size={16} />
                            </ActionIcon>
                          </Tooltip>
                        )}
                      </Group>
                    </Group>
                  </Stack>
                </Card>
              );
            })}
          </SimpleGrid>
        </Box>

        {/* Work Categories Tabs */}
        <Tabs defaultValue="vibe-coded" variant="pills" color="sakura">
          <Tabs.List justify="center" mb="xl">
            <Tabs.Tab
              value="vibe-coded"
              leftSection={<IconBrain size={16} />}
              fw={600}
            >
              Vibe Coded
            </Tabs.Tab>
            <Tabs.Tab
              value="standard-work"
              leftSection={<IconCode size={16} />}
              fw={600}
            >
              Standard Work
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
                {vibeCodedProjects.map(project => {
                  const screenshots = getProjectScreenshots(project);
                  return (
                    <Card
                      key={project.id}
                      p="lg"
                      withBorder
                      radius="lg"
                      h="100%"
                    >
                      <Stack gap="md" h="100%">
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
                            background:
                              'linear-gradient(135deg, #E91E63, #F8BBD9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            transition:
                              'transform 0.2s ease, box-shadow 0.2s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform =
                              'translateY(-2px)';
                            e.currentTarget.style.boxShadow =
                              '0 8px 25px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <Image
                            src={screenshots.thumbnail}
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
                              const fallback =
                                target.nextElementSibling as HTMLElement;
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
                              background:
                                'linear-gradient(135deg, #E91E63, #F8BBD9)',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                            }}
                          >
                            <ThemeIcon
                              color="white"
                              variant="filled"
                              size="lg"
                              radius="xl"
                            >
                              <IconBrain size={20} />
                            </ThemeIcon>
                          </Box>

                          {/* Click indicator overlay */}
                          <Box
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: 'rgba(0, 0, 0, 0.7)',
                              borderRadius: '50%',
                              padding: '6px',
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
                            <IconExternalLink size={14} color="white" />
                          </Box>
                        </Box>

                        <Group justify="space-between" align="flex-start">
                          <Group>
                            <ThemeIcon color="sakura" variant="light" size="lg">
                              <IconBrain size={20} />
                            </ThemeIcon>
                            <Box>
                              <Title order={4}>{project.title}</Title>
                              <Text size="sm" c="dimmed">
                                {project.category}
                              </Text>
                            </Box>
                          </Group>
                          <Badge
                            color={getStatusColor(project.status)}
                            variant="light"
                            size="sm"
                          >
                            {project.status}
                          </Badge>
                        </Group>

                        <Text size="sm" lh={1.5}>
                          {project.description}
                        </Text>

                        <Box>
                          <Text size="xs" fw={500} mb="xs" c="dimmed">
                            Technologies:
                          </Text>
                          <Group gap="xs">
                            {project.technologies.slice(0, 4).map(tech => (
                              <Badge
                                key={tech}
                                size="xs"
                                variant="outline"
                                color="sakura"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 4 && (
                              <Badge size="xs" variant="outline" color="gray">
                                +{project.technologies.length - 4} more
                              </Badge>
                            )}
                          </Group>
                        </Box>

                        <Group justify="space-between" mt="auto">
                          <Text size="xs" c="dimmed">
                            <IconCalendar
                              size={12}
                              style={{ marginRight: 4 }}
                            />
                            {project.timeline}
                          </Text>
                          <Group gap="xs">
                            {project.liveUrl && (
                              <ActionIcon
                                component="a"
                                href={project.liveUrl}
                                target="_blank"
                                color="sakura"
                                variant="light"
                                size="xs"
                              >
                                <IconExternalLink size={12} />
                              </ActionIcon>
                            )}
                            {project.githubUrl && (
                              <ActionIcon
                                component="a"
                                href={project.githubUrl}
                                target="_blank"
                                color="sakura"
                                variant="light"
                                size="xs"
                              >
                                <IconBrandGithub size={12} />
                              </ActionIcon>
                            )}
                          </Group>
                        </Group>
                      </Stack>
                    </Card>
                  );
                })}
              </SimpleGrid>
            </Box>
          </Tabs.Panel>

          <Tabs.Panel value="standard-work">
            <Box>
              <Group justify="center" mb="xl">
                <Title order={2} ta="center">
                  Standard Work Projects
                </Title>
                <Badge
                  leftSection={<IconTools size={14} />}
                  color="blue"
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
                {standardWorkProjects.map(project => {
                  const screenshots = getProjectScreenshots(project);
                  return (
                    <Card
                      key={project.id}
                      p="lg"
                      withBorder
                      radius="lg"
                      h="100%"
                    >
                      <Stack gap="md" h="100%">
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
                            background:
                              'linear-gradient(135deg, #228BE6, #74C0FC)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            transition:
                              'transform 0.2s ease, box-shadow 0.2s ease',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.transform =
                              'translateY(-2px)';
                            e.currentTarget.style.boxShadow =
                              '0 8px 25px rgba(0,0,0,0.15)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <Image
                            src={screenshots.thumbnail}
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
                              const fallback =
                                target.nextElementSibling as HTMLElement;
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
                              background:
                                'linear-gradient(135deg, #228BE6, #74C0FC)',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                            }}
                          >
                            <ThemeIcon
                              color="white"
                              variant="filled"
                              size="lg"
                              radius="xl"
                            >
                              <IconCode size={20} />
                            </ThemeIcon>
                          </Box>

                          {/* Click indicator overlay */}
                          <Box
                            style={{
                              position: 'absolute',
                              top: '8px',
                              right: '8px',
                              background: 'rgba(0, 0, 0, 0.7)',
                              borderRadius: '50%',
                              padding: '6px',
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
                            <IconExternalLink size={14} color="white" />
                          </Box>
                        </Box>

                        <Group justify="space-between" align="flex-start">
                          <Group>
                            <ThemeIcon color="blue" variant="light" size="lg">
                              <IconCode size={20} />
                            </ThemeIcon>
                            <Box>
                              <Title order={4}>{project.title}</Title>
                              <Text size="sm" c="dimmed">
                                {project.category}
                              </Text>
                            </Box>
                          </Group>
                          <Badge
                            color={getStatusColor(project.status)}
                            variant="light"
                            size="sm"
                          >
                            {project.status}
                          </Badge>
                        </Group>

                        <Text size="sm" lh={1.5}>
                          {project.description}
                        </Text>

                        <Box>
                          <Text size="xs" fw={500} mb="xs" c="dimmed">
                            Technologies:
                          </Text>
                          <Group gap="xs">
                            {project.technologies.slice(0, 4).map(tech => (
                              <Badge
                                key={tech}
                                size="xs"
                                variant="outline"
                                color="blue"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 4 && (
                              <Badge size="xs" variant="outline" color="gray">
                                +{project.technologies.length - 4} more
                              </Badge>
                            )}
                          </Group>
                        </Box>

                        <Group justify="space-between" mt="auto">
                          <Text size="xs" c="dimmed">
                            <IconCalendar
                              size={12}
                              style={{ marginRight: 4 }}
                            />
                            {project.timeline}
                          </Text>
                          <Group gap="xs">
                            {project.liveUrl && (
                              <ActionIcon
                                component="a"
                                href={project.liveUrl}
                                target="_blank"
                                color="blue"
                                variant="light"
                                size="xs"
                              >
                                <IconExternalLink size={12} />
                              </ActionIcon>
                            )}
                            {project.githubUrl && (
                              <ActionIcon
                                component="a"
                                href={project.githubUrl}
                                target="_blank"
                                color="blue"
                                variant="light"
                                size="xs"
                              >
                                <IconBrandGithub size={12} />
                              </ActionIcon>
                            )}
                          </Group>
                        </Group>
                      </Stack>
                    </Card>
                  );
                })}
              </SimpleGrid>
            </Box>
          </Tabs.Panel>
        </Tabs>

        {/* Philosophy Section */}
        <Paper
          p="xl"
          withBorder
          radius="lg"
          style={{ background: 'rgba(248, 187, 217, 0.05)' }}
        >
          <Group align="flex-start" gap="xl">
            <ThemeIcon size={60} radius="xl" color="sakura" variant="light">
              <IconHeart size={30} />
            </ThemeIcon>
            <Box style={{ flex: 1 }}>
              <Title order={3} mb="md">
                {projectsData.philosophy.title}
              </Title>
              <Text size="lg" lh={1.6} mb="md">
                {projectsData.philosophy.description}
              </Text>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
                <Box>
                  <Group mb="sm">
                    <IconBrain size={20} color="#E91E63" />
                    <Text fw={600} c="sakura">
                      {projectsData.philosophy.vibeCoded.title}
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {projectsData.philosophy.vibeCoded.description}
                  </Text>
                </Box>
                <Box>
                  <Group mb="sm">
                    <IconCode size={20} color="#228BE6" />
                    <Text fw={600} c="blue">
                      {projectsData.philosophy.standardWork.title}
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {projectsData.philosophy.standardWork.description}
                  </Text>
                </Box>
              </SimpleGrid>
            </Box>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
}
