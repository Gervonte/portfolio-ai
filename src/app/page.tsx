'use client';

import ParallaxElement from '@/components/ParallaxElement';
import SakuraBackground from '@/components/SakuraBackground';
import ScrollIndicator from '@/components/ScrollIndicator';
import { colorCombinations, commonColors } from '@/lib/colors';
import { ParallaxProvider } from '@/lib/parallax-context';
import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { Suspense, lazy, memo } from 'react';

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
    <ParallaxProvider>
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
              <ParallaxElement speed={-1} center={true}>
                <Title
                  order={1}
                  ta="center"
                  mb="md"
                  style={{
                    background: colorCombinations.sakuraGradient,
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
              </ParallaxElement>
              <ParallaxElement speed={-0.8} center={true}>
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
                  2025 M.S. Computer Science Graduate | 2 Years of Series B Fintech Startup
                  Experience
                </Text>
              </ParallaxElement>
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
              <ParallaxElement speed={-0.8} center={true}>
                <Group justify="center" gap="md">
                  <Button
                    size="lg"
                    color="sakura"
                    aria-label="View my work projects"
                    style={{
                      background: colorCombinations.sakuraGradient,
                      border: 'none',
                      boxShadow: `0 4px 15px ${commonColors.shadowSakura}`,
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => {
                      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 6px 20px ${commonColors.shadowSakura}`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 15px ${commonColors.shadowSakura}`;
                    }}
                  >
                    View My Work
                  </Button>
                  <Button
                    size="lg"
                    variant="filled"
                    color="sakura"
                    aria-label="Contact me for opportunities"
                    style={{
                      background: commonColors.accentSecondary + '1A',
                      color: commonColors.accentPrimary,
                      border: 'none',
                      boxShadow: `0 4px 15px ${commonColors.shadowMedium}`,
                      borderColor: commonColors.accentPrimary,
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 6px 20px ${commonColors.shadowMedium}`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = `0 4px 15px ${commonColors.shadowMedium}`;
                    }}
                  >
                    Contact Me
                  </Button>
                </Group>
              </ParallaxElement>
            </Stack>
          </Container>
        </Box>
      </SakuraBackground>

      <ParallaxElement speed={0.8} center={true}>
        <Box
          id="work"
          role="region"
          aria-label="Work projects"
          style={{
            minHeight: '100vh',
            padding: '4rem 0',
            background: commonColors.backgroundPrimary,
          }}
        >
          <Suspense fallback={<SectionLoader />}>
            <WorkSection />
          </Suspense>
        </Box>
      </ParallaxElement>

      <ParallaxElement speed={-0.8} center={true}>
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
      </ParallaxElement>

      {/* About Section */}
      <ParallaxElement speed={-0.8} center={true}>
        <Box id="about" role="main" style={{ minHeight: '100vh', padding: '4rem 0' }}>
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
        </Box>
      </ParallaxElement>

      <ParallaxElement speed={0.8} center={true}>
        <Box
          id="contact"
          role="region"
          aria-label="Contact information"
          style={{
            minHeight: '100vh',
            padding: '4rem 0',
            background: commonColors.backgroundPrimary,
          }}
        >
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
        </Box>
      </ParallaxElement>

      {/* Scroll Indicator */}
      <ScrollIndicator
        sections={['hero', 'work', 'experience', 'about', 'contact']}
        showProgress={true}
        showNavigation={true}
        position="bottom"
        orientation="horizontal"
        variant="detailed"
      />
    </ParallaxProvider>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
