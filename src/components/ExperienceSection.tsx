'use client';

import {
  Container,
  Title,
  Text,
  Card,
  Group,
  Stack,
  Badge,
  List,
  ThemeIcon,
  Box,
  Timeline,
  Paper,
} from '@mantine/core';
import {
  IconBriefcase,
  IconMapPin,
  IconCode,
  IconRocket,
  IconUsers,
  IconTarget,
} from '@tabler/icons-react';
import { aboutData } from '@/lib/about';

export default function ExperienceSection() {
  const { experience } = aboutData;

  // Utility function to get icon for achievement type
  const getAchievementIcon = (achievement: string) => {
    if (
      achievement.toLowerCase().includes('shipped') ||
      achievement.toLowerCase().includes('built')
    ) {
      return <IconRocket size={16} />;
    }
    if (
      achievement.toLowerCase().includes('refactored') ||
      achievement.toLowerCase().includes('api')
    ) {
      return <IconCode size={16} />;
    }
    if (
      achievement.toLowerCase().includes('collaborated') ||
      achievement.toLowerCase().includes('team')
    ) {
      return <IconUsers size={16} />;
    }
    return <IconTarget size={16} />;
  };

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
            Professional Experience
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            Building scalable software solutions and leading technical
            initiatives in fintech
          </Text>
        </Box>

        {/* Experience Timeline */}
        <Timeline bulletSize={24} lineWidth={2}>
          {experience.map((exp, index) => (
            <Timeline.Item
              key={index}
              bullet={
                <ThemeIcon color="sakura" variant="filled" size={24}>
                  <IconBriefcase size={14} />
                </ThemeIcon>
              }
              title={
                <Group gap="sm" mb="xs">
                  <Text fw={600} size="lg">
                    {exp.title}
                  </Text>
                  <Badge color="sakura" variant="light" size="sm">
                    {exp.period}
                  </Badge>
                </Group>
              }
            >
              <Card p="lg" withBorder radius="lg" mb="md">
                <Stack gap="md">
                  {/* Company and Location */}
                  <Group gap="sm" mb="sm">
                    <ThemeIcon color="sakura" variant="light" size="sm">
                      <IconMapPin size={14} />
                    </ThemeIcon>
                    <Text fw={500} size="md" c="sakura">
                      {exp.company}
                    </Text>
                  </Group>

                  {/* Description */}
                  {exp.description && (
                    <Text size="sm" c="dimmed" mb="md">
                      {exp.description}
                    </Text>
                  )}

                  {/* Key Achievements */}
                  <Box>
                    <Text fw={600} size="sm" mb="sm" c="dark">
                      Key Achievements:
                    </Text>
                    <List spacing="sm" size="sm">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <List.Item
                          key={achievementIndex}
                          icon={
                            <ThemeIcon color="sakura" variant="light" size="sm">
                              {getAchievementIcon(achievement)}
                            </ThemeIcon>
                          }
                        >
                          <Text size="sm">{achievement}</Text>
                        </List.Item>
                      ))}
                    </List>
                  </Box>

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <Box>
                      <Text fw={600} size="sm" mb="sm" c="dark">
                        Technologies Used:
                      </Text>
                      <Group gap="xs">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            color="sakura"
                            variant="outline"
                            size="sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </Group>
                    </Box>
                  )}
                </Stack>
              </Card>
            </Timeline.Item>
          ))}
        </Timeline>

        {/* Call to Action */}
        <Paper p="xl" withBorder radius="lg" ta="center" mt="xl">
          <Stack gap="md">
            <Title order={3} c="sakura">
              Ready to Build Something Amazing?
            </Title>
            <Text size="md" c="dimmed" maw={600} mx="auto">
              I&apos;m passionate about creating innovative solutions and would
              love to discuss how my experience can contribute to your
              team&apos;s success.
            </Text>
            <Group justify="center" gap="md" mt="md">
              <Badge
                leftSection={<IconRocket size={14} />}
                color="sakura"
                variant="light"
                size="lg"
                radius="xl"
              >
                Available for Opportunities
              </Badge>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
