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
import { Suspense, lazy, memo } from 'react';
import SakuraBackground from '@/components/SakuraBackground';
import ScrollIndicator from '@/components/ScrollIndicator';

// Lazy load heavy components
const AboutSection = lazy(() => import('@/components/AboutSection'));
const WorkSection = lazy(() => import('@/components/WorkSection'));
const ExperienceSection = lazy(() => import('@/components/ExperienceSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

// Loading component for sections
const SectionLoader = memo(() => (
  <Box
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    }}
  >
    <Text size="lg" c="dimmed">
      Loading...
    </Text>
  </Box>
));

SectionLoader.displayName = 'SectionLoader';

const HomePage = memo(() => {
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
                Gervonte Fowler
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
                Full-Stack Software Engineer & AI Researcher
              </Text>
              <Text
                ta="center"
                size="lg"
                mb="xl"
                c="dimmed"
                style={{
                  maxWidth: '700px',
                  lineHeight: 1.6,
                }}
              >
                Passionate about building scalable software solutions and
                advancing AI research. Currently pursuing MS in Computer Science
                with focus on LLM evaluation and explainable AI systems.
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
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </Box>

      <Box
        id="work"
        style={{ minHeight: '100vh', padding: '4rem 0', background: '#FDFCFB' }}
      >
        <Suspense fallback={<SectionLoader />}>
          <WorkSection />
        </Suspense>
      </Box>

      <Box id="experience" style={{ minHeight: '100vh', padding: '4rem 0' }}>
        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection />
        </Suspense>
      </Box>

      <Box
        id="contact"
        style={{ minHeight: '100vh', padding: '4rem 0', background: '#FDFCFB' }}
      >
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
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
});

HomePage.displayName = 'HomePage';

export default HomePage;
