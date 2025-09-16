'use client';

import {
  Container,
  Title,
  Text,
  Grid,
  Card,
  Badge,
  Group,
  Stack,
  Timeline,
  Box,
  Divider,
  Paper,
  ThemeIcon,
  List,
  SimpleGrid,
} from '@mantine/core';
import {
  IconCode,
  IconDatabase,
  IconCloud,
  IconTools,
  IconSchool,
  IconBriefcase,
  // IconHeart,
  IconRocket,
  IconUsers,
  IconTarget,
  IconFileText,
} from '@tabler/icons-react';
import { aboutData, getSkillsByCategory, getSkillColor, type Skill } from '@/lib/about';
import { memo } from 'react';

// Use data from metadata file
const { personalInfo, experience, education, researchProjects, leadership } = aboutData;

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
              background: 'linear-gradient(135deg, #F44336, #FFCDD2)',
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
                    <Group key={skill.name} justify="space-between">
                      <Text size="sm" fw={500}>
                        {skill.name}
                      </Text>
                      <Badge color={getSkillColor(skill.level)} variant="light" size="sm">
                        {skill.level}
                      </Badge>
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
