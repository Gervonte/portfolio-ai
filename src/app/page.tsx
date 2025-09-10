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
          role="banner"
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
                  background: 'linear-gradient(135deg, #F44336, #FFCDD2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: 'clamp(3.5rem, 6vw, 5rem)',
                  fontWeight: 700,
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                }}
              >
                Hello, I&apos;m Gervonte Fowler
              </Title>
              <Text
                ta="center"
                size="xl"
                mb="xl"
                c="dimmed"
                style={{
                  maxWidth: '850px',
                  lineHeight: 1.6,
                }}
              >
                2025 M.S. Computer Science Graduate | 2 Years of Series B
                Fintech Startup Experience
              </Text>
              {/* <Text
                ta="center"
                size="lg"
                mb="xl"
                c="dimmed"
                style={{
                  maxWidth: '700px',
                  lineHeight: 1.6,
                }}
              >
                Skilled in building scalable applications, data-driven
                solutions, and contributing to fast-paced, high-growth
                environments with or without the use of AI.
              </Text> */}
              <Group justify="center" gap="md">
                <Button
                  size="lg"
                  color="sakura"
                  aria-label="View my work projects"
                  style={{
                    background: 'linear-gradient(135deg, #F44336, #EF9A9A)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)',
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
                  aria-label="Contact me for opportunities"
                  style={{
                    borderColor: '#F44336',
                    color: '#F44336',
                    background: 'rgba(255, 205, 210, 0.1)',
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

      <Box
        id="work"
        role="region"
        aria-label="Work projects"
        style={{ minHeight: '100vh', padding: '4rem 0', background: '#FDFCFB' }}
      >
        <Suspense fallback={<SectionLoader />}>
          <WorkSection />
        </Suspense>
      </Box>

      <Box
        id="experience"
        role="region"
        aria-label="Professional experience"
        style={{ minHeight: '100vh', padding: '4rem 0' }}
      >
        <Suspense fallback={<SectionLoader />}>
          <ExperienceSection />
        </Suspense>
      </Box>

      {/* About Section */}
      <Box
        id="about"
        role="main"
        style={{ minHeight: '100vh', padding: '4rem 0' }}
      >
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </Box>

      <Box
        id="contact"
        role="region"
        aria-label="Contact information"
        style={{ minHeight: '100vh', padding: '4rem 0', background: '#FDFCFB' }}
      >
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </Box>

      {/* Scroll Indicator */}
      <ScrollIndicator
        sections={['hero', 'work', 'experience', 'about', 'contact']}
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
