'use client';

import {
  Container,
  Title,
  Text,
  Button,
  Group,
  Box,
  Stack,
} from '@mantine/core';
import SakuraBackground from '@/components/SakuraBackground';
import ScrollIndicator from '@/components/ScrollIndicator';
import AboutSection from '@/components/AboutSection';
import WorkSection from '@/components/WorkSection';
import ExperienceSection from '@/components/ExperienceSection';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <SakuraBackground intensity="moderate" variant="falling">
        <Box
          id="hero"
          style={{
            position: 'relative',
            zIndex: 2,
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container size="lg" py="xl">
            <Stack align="center" gap="xl">
              <Title
                order={1}
                ta="center"
                mb="md"
                style={{
                  background: 'linear-gradient(135deg, #E91E63, #F8BBD9)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 700,
                }}
              >
                Welcome to My Portfolio
              </Title>
              <Text
                ta="center"
                size="xl"
                mb="xl"
                c="dimmed"
                style={{
                  maxWidth: '600px',
                  lineHeight: 1.6,
                }}
              >
                Professional portfolio showcasing AI-assisted and traditional
                development work with a touch of mono no aware
              </Text>
              <Group justify="center" gap="md">
                <Button
                  size="lg"
                  color="sakura"
                  style={{
                    background: 'linear-gradient(135deg, #E91E63, #F48FB1)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(233, 30, 99, 0.3)',
                  }}
                  onClick={() => {
                    document
                      .getElementById('work')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View My Work
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  color="sakura"
                  style={{
                    borderColor: '#E91E63',
                    color: '#E91E63',
                    background: 'rgba(248, 187, 217, 0.1)',
                  }}
                  onClick={() => {
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact Me
                </Button>
              </Group>
            </Stack>
          </Container>
        </Box>
      </SakuraBackground>

      {/* About Section */}
      <Box id="about" style={{ minHeight: '100vh', padding: '4rem 0' }}>
        <AboutSection />
      </Box>

      <Box
        id="work"
        style={{ minHeight: '100vh', padding: '4rem 0', background: '#FDFCFB' }}
      >
        <WorkSection />
      </Box>

      <Box id="experience" style={{ minHeight: '100vh', padding: '4rem 0' }}>
        <ExperienceSection />
      </Box>

      <Box
        id="contact"
        style={{ minHeight: '100vh', padding: '4rem 0', background: '#FDFCFB' }}
      >
        <Container size="lg">
          <Title order={2} ta="center" mb="xl">
            Contact Section
          </Title>
          <Text ta="center" c="dimmed">
            This section will contain your contact information and contact form.
          </Text>
        </Container>
      </Box>

      {/* Scroll Indicator */}
      <ScrollIndicator
        sections={['hero', 'about', 'work', 'experience', 'contact']}
        showProgress={true}
        showNavigation={true}
        position="bottom"
        orientation="horizontal"
        variant="detailed"
      />
    </>
  );
}
