'use client';

import { aboutData } from '@/lib/about';
import { colorCombinations } from '@/lib/colors';
import { Box, Container, Stack, Text, Timeline, Title } from '@mantine/core';
import { IconBriefcase, IconExternalLink, IconMapPin } from '@tabler/icons-react';
import { memo } from 'react';
import UnifiedCard from './UnifiedCard';

const ExperienceSection = memo(() => {
  const { experience } = aboutData;

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
            Professional Experience
          </Title>
          <Text size="xl" c="dimmed" maw={800} mx="auto">
            Building scalable software solutions and leading technical initiatives in fintech
          </Text>
        </Box>

        {/* Experience Timeline */}
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
      </Stack>
    </Container>
  );
});

ExperienceSection.displayName = 'ExperienceSection';

export default ExperienceSection;
