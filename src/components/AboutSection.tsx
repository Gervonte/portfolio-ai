'use client';

import { aboutData, getSkillColor, getSkillsByCategory, type Skill } from '@/lib/about';
import { colorCombinations } from '@/lib/colors';
import {
  Badge,
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  List,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconApi,
  IconBrandCss3,
  IconBrandGit,
  IconBrandGithub,
  IconBrandGraphql,
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandNodejs,
  IconBrandPython,
  IconBrandReact,
  IconBrandTypescript,
  IconCloud,
  IconCode,
  IconDatabase,
  IconFileText,
  IconSchool,
  IconTarget,
  IconTools,
  IconUsers,
} from '@tabler/icons-react';
import { memo } from 'react';
import BadgeWithTooltip from './BadgeWithTooltip';

// Use data from metadata file
const { personalInfo, education, researchProjects, leadership } = aboutData;

// Utility function to get icon component from string
const getCategoryIconComponent = (category: Skill['category']) => {
  switch (category) {
    case 'frontend':
      return <IconCode size={16} />;
    case 'backend':
      return <IconDatabase size={16} />;
    case 'devops':
      return <IconCloud size={16} />;
    case 'tools':
      return <IconTools size={16} />;
    case 'soft':
      return <IconUsers size={16} />;
    default:
      return <IconCode size={16} />;
  }
};

// Utility function to get display name for category
const getCategoryDisplayName = (category: string) => {
  switch (category) {
    case 'frontend':
      return 'Frontend';
    case 'backend':
      return 'Backend';
    case 'devops':
      return 'DevOps & Workflow';
    case 'tools':
      return 'Development Tools';
    case 'soft':
      return 'Soft Skills';
    default:
      return category.charAt(0).toUpperCase() + category.slice(1);
  }
};

// Utility function to get skill icon component
const getSkillIconComponent = (skillName: string) => {
  const skillLower = skillName.toLowerCase();

  switch (skillLower) {
    // Frontend Technologies
    case 'react':
      return <IconBrandReact size={16} />;
    case 'typescript':
      return <IconBrandTypescript size={16} />;
    case 'javascript':
      return <IconBrandJavascript size={16} />;
    case 'html':
      return <IconBrandHtml5 size={16} />;
    case 'css':
      return <IconBrandCss3 size={16} />;

    // Backend Technologies
    case 'python':
      return <IconBrandPython size={16} />;
    case 'node.js':
    case 'nodejs':
      return <IconBrandNodejs size={16} />;
    case 'express':
      return <IconCode size={16} />; // Express uses generic code icon
    case 'rest apis':
      return <IconApi size={16} />;
    case 'graphql':
      return <IconBrandGraphql size={16} />;

    // Database
    case 'postgresql':
      return <IconDatabase size={16} />;

    // DevOps & Tools
    case 'git':
      return <IconBrandGit size={16} />;
    case 'github actions':
      return <IconBrandGithub size={16} />;

    // Default fallback
    default:
      return <IconCode size={16} />;
  }
};

const AboutSection = memo(() => {
  const skillCategories = getSkillsByCategory();

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Hero Section */}
        <Box ta="center" mb="xl">
          <Group justify="center" mb="md">
            <Badge
              leftSection={<IconFileText size={14} />}
              color="sakura"
              variant="light"
              size="lg"
              radius="xl"
            >
              Generated from Resume
            </Badge>
          </Group>
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
            About Me
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            {personalInfo.summary}
          </Text>
        </Box>

        {/* Skills Section */}
        <Box>
          <Title order={2} ta="center" mb="xl">
            Technical Skills
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {Object.entries(skillCategories).map(([category, categorySkills]) => (
              <Card key={category} p="lg" withBorder radius="lg">
                <Group mb="md">
                  {getCategoryIconComponent(category as Skill['category'])}
                  <Title order={4}>{getCategoryDisplayName(category)} Skills</Title>
                </Group>
                <Stack gap="sm">
                  {categorySkills.map(skill => (
                    <Group key={skill.name} justify="space-between" align="center">
                      <Group gap="xs" align="center">
                        <ThemeIcon
                          color={getSkillColor(skill.level)}
                          variant="light"
                          size="sm"
                          radius="sm"
                        >
                          {getSkillIconComponent(skill.name)}
                        </ThemeIcon>
                        <Text size="sm" fw={500}>
                          {skill.name}
                        </Text>
                      </Group>
                      <BadgeWithTooltip
                        contextType="skill"
                        contextValue={skill.level}
                        color={getSkillColor(skill.level)}
                        variant="light"
                        size="sm"
                      >
                        {skill.level}
                      </BadgeWithTooltip>
                    </Group>
                  ))}
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Experience Timeline
        <Box>
          <Title order={2} ta="center" mb="xl">
            Professional Experience
          </Title>
          <Timeline
            active={experience.length - 1}
            bulletSize={24}
            lineWidth={2}
          >
            {experience.map((exp, index) => (
              <Timeline.Item
                key={index}
                bullet={<IconBriefcase size={12} />}
                title={
                  <Group>
                    <Text fw={600} size="lg">
                      {exp.title}
                    </Text>
                    <Badge color="sakura" variant="light">
                      {exp.period}
                    </Badge>
                  </Group>
                }
              >
                <Text fw={500} c="sakura" size="md" mb="xs">
                  {exp.company}
                </Text>
                <Text mb="md" c="dimmed">
                  {exp.description}
                </Text>
                <Group mb="sm">
                  <Text size="sm" fw={500}>
                    Highlights:
                  </Text>
                  <Group gap="xs">
                    {exp.technologies.map(tech => (
                      <Badge
                        key={tech}
                        size="sm"
                        variant="outline"
                        color="sakura"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </Group>
                </Group>
                <List size="sm" spacing="xs">
                  {exp.achievements.map((achievement, idx) => (
                    <List.Item key={idx}>{achievement}</List.Item>
                  ))}
                </List>
              </Timeline.Item>
            ))}
          </Timeline>
        </Box> */}

        {/* Research Projects */}
        <Box>
          <Title order={2} ta="center" mb="xl">
            Graduate Research Projects
          </Title>
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
            {researchProjects.map((project, index) => (
              <Card key={index} p="lg" withBorder radius="lg" h="100%">
                <Group mb="md">
                  <ThemeIcon color="sakura" variant="light">
                    <IconTarget size={20} />
                  </ThemeIcon>
                  <Box>
                    <Title order={4}>{project.title}</Title>
                    <Text size="sm" c="sakura">
                      {project.period}
                    </Text>
                  </Box>
                </Group>
                <Text mb="md" c="dimmed">
                  {project.description}
                </Text>
                <Group mb="md">
                  <Text size="sm" fw={500}>
                    Highlights:
                  </Text>
                  <Group gap="xs">
                    {project.technologies.map(tech => (
                      <Badge key={tech} size="sm" variant="outline" color="sakura">
                        {tech}
                      </Badge>
                    ))}
                  </Group>
                </Group>
                <List size="sm" spacing="xs">
                  {project.achievements.map((achievement, idx) => (
                    <List.Item key={idx}>{achievement}</List.Item>
                  ))}
                </List>
              </Card>
            ))}
          </SimpleGrid>
        </Box>

        {/* Education & Certifications */}
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card p="lg" withBorder radius="lg" h="100%">
              <Group mb="md">
                <ThemeIcon color="sakura" variant="light">
                  <IconSchool size={20} />
                </ThemeIcon>
                <Title order={3}>Education</Title>
              </Group>
              <Stack gap="md">
                {education.map((edu, index) => (
                  <Box key={index}>
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="md">
                        {edu.degree}
                      </Text>
                      <Text c="sakura" size="sm" mb="xs">
                        {edu.institution} • {edu.year}
                      </Text>
                      {edu.description && (
                        <Text size="sm" c="dimmed">
                          {edu.description}
                        </Text>
                      )}
                    </Box>
                    {index < education.length - 1 && <Divider my="md" />}
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card p="lg" withBorder radius="lg" h="100%">
              <Group mb="md">
                <ThemeIcon color="sakura" variant="light">
                  <IconUsers size={20} />
                </ThemeIcon>
                <Title order={3}>Leadership</Title>
              </Group>
              <Stack gap="md">
                {leadership.map((role, index) => (
                  <Box key={index}>
                    <Box style={{ flex: 1 }}>
                      <Text fw={600} size="md">
                        {role.name}
                      </Text>
                      <Text c="sakura" size="sm" mb="xs">
                        {role.organization} • {role.year}
                      </Text>
                      {role.description && (
                        <Text size="sm" c="dimmed">
                          {role.description}
                        </Text>
                      )}
                    </Box>
                    {index < leadership.length - 1 && <Divider my="md" />}
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
