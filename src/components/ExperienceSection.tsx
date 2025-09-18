'use client';

import { aboutData } from '@/lib/about';
import { useColorCombinations } from '@/lib/theme-aware-colors';
import { Box, Container, Stack, Text, Timeline, Title } from '@mantine/core';
import { IconBriefcase, IconExternalLink, IconMapPin } from '@tabler/icons-react';
import { memo } from 'react';
import UnifiedCard from './UnifiedCard';

const ExperienceSection = memo(() => {
  const { experience } = aboutData;
  const colorCombinations = useColorCombinations();

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
              backgroundImage: colorCombinations.primaryGradient,
              backgroundSize: '100% 100%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Professional Experience
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            Building scalable software solutions and leading technical initiatives in fintech
          </Text>
        </Box>

        {/* Experience Timeline or Single Card */}
        {experience.length > 1 ? (
          <Timeline bulletSize={24} lineWidth={2}>
            {experience.map((exp, index) => (
              <Timeline.Item key={index}>
                <UnifiedCard
                  title={exp.company}
                  subtitle={exp.title}
                  description={exp.description}
                  longDescription={exp.longDescription}
                  headerIcon={<IconBriefcase size={20} />}
                  headerIconColor="sakura"
                  timeline={exp.period}
                  metadata={[
                    {
                      icon: <IconMapPin size={14} />,
                      text: 'San Francisco, California',
                    },
                  ]}
                  secondaryAction={{
                    label: 'Website',
                    icon: <IconExternalLink size={14} />,
                    href: 'https://novacredit.com',
                    tooltip: 'Visit NovaCredit website',
                  }}
                  technologies={exp.technologies?.map(tech => ({
                    name: tech,
                    color: 'sakura',
                    contextType: 'technology' as const,
                    contextValue: tech,
                  }))}
                  achievements={exp.achievements}
                  professionalAchievements={true}
                  infoBoxDescription={true}
                  variant="default"
                  size="md"
                  interactive={false}
                  hoverable={true}
                />
              </Timeline.Item>
            ))}
          </Timeline>
        ) : (
          <Stack gap="md">
            {experience.map((exp, index) => (
              <UnifiedCard
                key={index}
                title={exp.company}
                subtitle={exp.title}
                description={exp.description}
                longDescription={exp.longDescription}
                headerIcon={<IconBriefcase size={20} />}
                headerIconColor="sakura"
                timeline={exp.period}
                metadata={[
                  {
                    icon: <IconMapPin size={14} />,
                    text: 'San Francisco, California',
                  },
                ]}
                secondaryAction={{
                  label: 'Website',
                  icon: <IconExternalLink size={14} />,
                  href: 'https://novacredit.com',
                  tooltip: 'Visit NovaCredit website',
                }}
                technologies={exp.technologies?.map(tech => ({
                  name: tech,
                  color: 'sakura',
                  contextType: 'technology' as const,
                  contextValue: tech,
                }))}
                achievements={exp.achievements}
                professionalAchievements={true}
                infoBoxDescription={true}
                variant="default"
                size="md"
                interactive={false}
                hoverable={true}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;
