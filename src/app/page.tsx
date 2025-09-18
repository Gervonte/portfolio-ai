'use client';

import ParallaxElement from '@/components/ParallaxElement';
import SakuraBackground from '@/components/SakuraBackground';
import { ModalProvider } from '@/lib/modal-context';
import { ParallaxProvider } from '@/lib/parallax-context';
import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { memo, useEffect } from 'react';

const ScrollIndicator = dynamic(() => import('@/components/ScrollIndicator'), {
  ssr: false,
});

// Lazy load sections below the fold for better performance
import dynamic from 'next/dynamic';

const AboutSection = dynamic(() => import('@/components/AboutSection'), {
  loading: () => <div className="loading-placeholder">Loading...</div>,
});

const WorkSection = dynamic(() => import('@/components/WorkSection'), {
  loading: () => <div className="loading-placeholder">Loading...</div>,
});

const ExperienceSection = dynamic(() => import('@/components/ExperienceSection'), {
  loading: () => <div className="loading-placeholder">Loading...</div>,
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  loading: () => <div className="loading-placeholder">Loading...</div>,
});

const HomePage = memo(() => {
  // Theme-aware colors
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();

  // Ensure page starts at top on mount and refresh
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);

    // Also try after a short delay to override any browser restoration
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ModalProvider>
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
                      backgroundImage: colorCombinations.primaryGradient,
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
                    style={{
                      maxWidth: '850px',
                      lineHeight: 1.6,
                      color: commonColors.textSecondary, // Use theme-aware color directly
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
                        background: colorCombinations.primaryGradient,
                        border: 'none',
                        boxShadow: `0 4px 15px ${commonColors.shadowPrimary}`,
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => {
                        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = `0 6px 20px ${commonColors.shadowPrimary}`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = `0 4px 15px ${commonColors.shadowPrimary}`;
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

        <ParallaxElement speed={1.5} center={true}>
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
            <WorkSection />
          </Box>
        </ParallaxElement>

        <ParallaxElement speed={-1.2} center={true}>
          <Box
            id="experience"
            role="region"
            aria-label="Professional experience"
            style={{ minHeight: '100vh', padding: '4rem 0' }}
          >
            <ExperienceSection />
          </Box>
        </ParallaxElement>

        {/* About Section */}
        <ParallaxElement speed={-1.5} center={true}>
          <Box
            id="about"
            role="main"
            style={{
              minHeight: '100vh',
              padding: '4rem 0',
              background: commonColors.backgroundPrimary,
            }}
          >
            <AboutSection />
          </Box>
        </ParallaxElement>

        <ParallaxElement speed={1.8} center={true}>
          <Box
            id="contact"
            role="region"
            aria-label="Contact information"
            style={{
              padding: '4rem 0 2rem',
            }}
          >
            <ContactSection />
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
    </ModalProvider>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
