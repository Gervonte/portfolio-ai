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
  IconAward,
  IconBriefcase,
  IconHeart,
  IconRocket,
  IconUsers,
  IconTarget,
  IconFileText,
} from '@tabler/icons-react';

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'devops' | 'tools' | 'soft';
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  description?: string;
}

interface ResearchProject {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
}

const skills: Skill[] = [
  // Languages & Tools
  { name: 'Python', level: 'expert', category: 'backend' },
  { name: 'TypeScript', level: 'expert', category: 'frontend' },
  { name: 'JavaScript', level: 'expert', category: 'frontend' },
  { name: 'React', level: 'expert', category: 'frontend' },
  { name: 'Node.js', level: 'expert', category: 'backend' },
  { name: 'Express.js', level: 'expert', category: 'backend' },
  { name: 'HTML/CSS', level: 'expert', category: 'frontend' },
  { name: 'REST APIs', level: 'expert', category: 'backend' },
  { name: 'PostgreSQL', level: 'expert', category: 'backend' },
  { name: 'GraphQL', level: 'intermediate', category: 'backend' },
  { name: 'Git', level: 'expert', category: 'tools' },
  { name: 'GitHub Actions', level: 'expert', category: 'devops' },

  // Data & Infrastructure
  { name: 'API Development', level: 'expert', category: 'backend' },
  { name: 'Docker', level: 'intermediate', category: 'devops' },
  { name: 'LLM Evaluation', level: 'advanced', category: 'tools' },
  { name: 'Prompt Engineering', level: 'advanced', category: 'tools' },
  { name: 'Model Interpretability', level: 'advanced', category: 'tools' },
  { name: 'Unit Testing', level: 'expert', category: 'tools' },
  { name: 'Integration Testing', level: 'expert', category: 'tools' },
  { name: 'CI/CD Pipelines', level: 'expert', category: 'devops' },

  // Product Experience
  { name: 'Product Thinking', level: 'advanced', category: 'soft' },
  { name: 'Agile Development', level: 'expert', category: 'soft' },
  { name: 'Developer Experience', level: 'expert', category: 'soft' },
  { name: 'API Documentation', level: 'expert', category: 'tools' },
  { name: 'UI/UX Iteration', level: 'advanced', category: 'frontend' },
  { name: 'A/B Testing', level: 'advanced', category: 'tools' },

  // Soft Skills
  { name: 'Team Leadership', level: 'advanced', category: 'soft' },
  { name: 'Problem Solving', level: 'expert', category: 'soft' },
  { name: 'Communication', level: 'expert', category: 'soft' },
  { name: 'Budget Management', level: 'advanced', category: 'soft' },
  { name: 'Event Planning', level: 'intermediate', category: 'soft' },
];

const experience: Experience[] = [
  {
    title: 'Software Engineer, Full Stack',
    company: 'NovaCredit (Fintech Startup)',
    period: 'August 2020 - June 2022',
    description:
      'Shipped production-ready full-stack features and refactored internal APIs into developer-facing public endpoints.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'REST APIs'],
    achievements: [
      'Shipped production-ready full-stack features using React, Node.js, and PostgreSQL, exposing real-time credit data through secure, scalable REST APIs',
      'Refactored internal APIs into developer-facing public endpoints, complete with API documentation, onboarding flows, and test sandboxes',
      'Collaborated on testing, deployment, and monitoring pipelines to ensure reliability and traceability across internal and partner-facing systems',
      'Built modular React (TypeScript) components to support iterative product experiments and rapid A/B testing',
    ],
  },
];

const education: Education[] = [
  {
    degree: 'Master of Science in Computer Science',
    institution: 'Florida Polytechnic University',
    year: 'June 2025',
    description:
      'GPA: 3.26 | Focused on AI/ML research, LLM evaluation, and explainable AI systems.',
  },
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Florida Polytechnic University',
    year: 'May 2020',
    description:
      'GPA: 3.54 | Comprehensive foundation in computer science, algorithms, and software engineering.',
  },
];

const researchProjects: ResearchProject[] = [
  {
    title: 'AI-Assisted User Story Generation',
    period: 'Spring 2025',
    description:
      'Graduate research project evaluating LLMs for generating Agile user stories using structured metrics.',
    technologies: ['Python', 'LLMs', 'ChatGPT', 'Gemini', 'QWEN', 'Agile'],
    achievements: [
      'Evaluated LLMs (ChatGPT, Gemini, QWEN) for generating Agile user stories using structured metrics such as coherence, completeness, and relevance',
      'Developed a lightweight framework for integrating LLM outputs into real-world Agile workflows to improve clarity and delivery speed',
      'Simulated product integration and human-in-the-loop validation, emphasizing real-world usage and developer trust',
    ],
  },
  {
    title: 'Enhancing Fake News Detection with Explainability',
    period: 'Spring 2025',
    description:
      'Graduate research project adding LIME-based explainability to high-accuracy classification models.',
    technologies: [
      'Python',
      'LIME',
      'Machine Learning',
      'HTML',
      'Visualization',
    ],
    achievements: [
      'Added LIME-based explainability to a high-accuracy classification model for fake news detection, improving transparency for non-technical stakeholders',
      'Built interactive HTML visualizations of model decisions to simulate user-facing explainability tools',
      "Analyzed the system's robustness and generalizability to mimic production-ready ML pipelines",
    ],
  },
];

const certifications: Certification[] = [
  {
    name: 'Treasurer, National Society of Black Engineers (NSBE)',
    issuer: 'Florida Polytechnic University Chapter',
    year: '2020 - Present',
    description:
      'Oversaw budgeting and logistics for conference attendance, managing registrations, hotels, and travel.',
  },
];

const getSkillColor = (level: Skill['level']) => {
  switch (level) {
    case 'expert':
      return 'sakura';
    case 'advanced':
      return 'blue';
    case 'intermediate':
      return 'green';
    case 'beginner':
      return 'gray';
    default:
      return 'gray';
  }
};

const getCategoryIcon = (category: Skill['category']) => {
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

export default function AboutSection() {
  const skillCategories = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

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
              background: 'linear-gradient(135deg, #E91E63, #F8BBD9)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            About Me
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            Full Stack Developer and Computer Science graduate student with
            expertise in modern web technologies, AI/ML research, and fintech
            applications. I specialize in building scalable systems and
            conducting cutting-edge research in explainable AI.
          </Text>
        </Box>

        {/* Professional Summary */}
        <Paper
          p="xl"
          withBorder
          radius="lg"
          style={{ background: 'rgba(248, 187, 217, 0.05)' }}
        >
          <Group align="flex-start" gap="xl">
            <ThemeIcon size={60} radius="xl" color="sakura" variant="light">
              <IconRocket size={30} />
            </ThemeIcon>
            <Box style={{ flex: 1 }}>
              <Title order={3} mb="md">
                Professional Summary
              </Title>
              <Text size="lg" lh={1.6}>
                I&apos;m a passionate Full Stack Developer and Computer Science
                graduate student with experience building production-ready
                applications at NovaCredit, a fintech startup. I specialize in
                React, Node.js, PostgreSQL, and have extensive experience with
                API development, testing pipelines, and A/B testing. Currently
                pursuing my M.S. in Computer Science with research focus on
                AI/ML, LLM evaluation, and explainable AI systems.
              </Text>
            </Box>
          </Group>
        </Paper>

        {/* Skills Section */}
        <Box>
          <Title order={2} ta="center" mb="xl">
            Technical Skills
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
            {Object.entries(skillCategories).map(
              ([category, categorySkills]) => (
                <Card key={category} p="lg" withBorder radius="lg">
                  <Group mb="md">
                    {getCategoryIcon(category as Skill['category'])}
                    <Title order={4} tt="capitalize">
                      {category} Skills
                    </Title>
                  </Group>
                  <Stack gap="sm">
                    {categorySkills.map(skill => (
                      <Group key={skill.name} justify="space-between">
                        <Text size="sm" fw={500}>
                          {skill.name}
                        </Text>
                        <Badge
                          color={getSkillColor(skill.level)}
                          variant="light"
                          size="sm"
                        >
                          {skill.level}
                        </Badge>
                      </Group>
                    ))}
                  </Stack>
                </Card>
              )
            )}
          </SimpleGrid>
        </Box>

        {/* Experience Timeline */}
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
                    Technologies:
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
        </Box>

        {/* Research Projects */}
        <Box>
          <Title order={2} ta="center" mb="xl">
            Research Projects
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
                    Technologies:
                  </Text>
                  <Group gap="xs">
                    {project.technologies.map(tech => (
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
                  <IconAward size={20} />
                </ThemeIcon>
                <Title order={3}>Certifications</Title>
              </Group>
              <Stack gap="md">
                {certifications.map((cert, index) => (
                  <Box key={index}>
                    <Text fw={600} size="md">
                      {cert.name}
                    </Text>
                    <Text c="sakura" size="sm" mb="xs">
                      {cert.issuer} • {cert.year}
                    </Text>
                    {cert.credentialId && (
                      <Text size="xs" c="dimmed" ff="monospace">
                        ID: {cert.credentialId}
                      </Text>
                    )}
                    {index < certifications.length - 1 && <Divider my="md" />}
                  </Box>
                ))}
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Personal Philosophy */}
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
                My Philosophy
              </Title>
              <Text size="lg" lh={1.6} mb="md">
                I believe in the power of technology to solve real-world
                problems and improve people&apos;s lives. My approach to
                development is rooted in:
              </Text>
              <List spacing="sm" size="md">
                <List.Item>
                  <Text fw={500}>Continuous Learning:</Text> Always staying
                  current with the latest technologies and best practices
                </List.Item>
                <List.Item>
                  <Text fw={500}>User-Centric Design:</Text> Building
                  applications that are not just functional, but delightful to
                  use
                </List.Item>
                <List.Item>
                  <Text fw={500}>Collaborative Growth:</Text> Mentoring others
                  and learning from diverse perspectives
                </List.Item>
                <List.Item>
                  <Text fw={500}>Quality & Performance:</Text> Writing clean,
                  maintainable code that scales with business needs
                </List.Item>
              </List>
            </Box>
          </Group>
        </Paper>
      </Stack>
    </Container>
  );
}
