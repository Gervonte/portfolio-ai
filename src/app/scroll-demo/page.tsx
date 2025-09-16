'use client';

import ScrollIndicator from '@/components/ScrollIndicator';
import { colorCombinations, commonColors } from '@/lib/colors';
import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';

export default function ScrollDemoPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Container size="lg" py="xl">
        <Stack gap="xl">
          <Title order={1} ta="center">
            Scroll Indicator Demo
          </Title>

          <Text ta="center" c="dimmed" size="lg">
            This page demonstrates the scroll indicator component with different variants and
            configurations.
          </Text>

          <Group justify="center" gap="md">
            <Button onClick={() => scrollToSection('section1')}>Go to Section 1</Button>
            <Button onClick={() => scrollToSection('section2')}>Go to Section 2</Button>
            <Button onClick={() => scrollToSection('section3')}>Go to Section 3</Button>
          </Group>

          {/* Demo Sections */}
          <Box
            id="section1"
            style={{
              minHeight: '100vh',
              padding: '4rem 0',
              background: commonColors.backgroundSecondary,
            }}
          >
            <Container size="lg">
              <Title order={2} ta="center" mb="xl">
                Section 1 - Minimal Scroll Indicator
              </Title>
              <Text ta="center" c="dimmed" size="lg">
                This section demonstrates the minimal scroll indicator variant. Notice the simple
                progress bar on the left side.
              </Text>
            </Container>
          </Box>

          <Box
            id="section2"
            style={{
              minHeight: '100vh',
              padding: '4rem 0',
              background: colorCombinations.sakuraGradientLight,
            }}
          >
            <Container size="lg">
              <Title order={2} ta="center" mb="xl">
                Section 2 - Detailed Scroll Indicator
              </Title>
              <Text ta="center" c="dimmed" size="lg">
                This section shows the detailed scroll indicator with progress percentage, section
                navigation, and quick action buttons.
              </Text>
            </Container>
          </Box>

          <Box
            id="section3"
            style={{
              minHeight: '100vh',
              padding: '4rem 0',
              background: colorCombinations.pinkGradientLight,
            }}
          >
            <Container size="lg">
              <Title order={2} ta="center" mb="xl">
                Section 3 - Scroll Features
              </Title>
              <Text ta="center" c="dimmed" size="lg">
                Scroll up and down to see the scroll indicator in action. Try clicking on different
                sections or using the navigation buttons.
              </Text>
            </Container>
          </Box>
        </Stack>
      </Container>

      {/* Minimal Scroll Indicator */}
      <ScrollIndicator
        sections={['section1', 'section2', 'section3']}
        showProgress={true}
        showNavigation={false}
        position="left"
        variant="minimal"
      />

      {/* Detailed Scroll Indicator */}
      <ScrollIndicator
        sections={['section1', 'section2', 'section3']}
        showProgress={true}
        showNavigation={true}
        position="right"
        variant="detailed"
      />
    </>
  );
}
