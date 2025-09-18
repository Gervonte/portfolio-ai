'use client';

import { useColorCombinations, useCommonColors } from '@/lib/theme-aware-colors';
import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core';
import { memo } from 'react';
import ParallaxElement from './ParallaxElement';
import SakuraBackground from './SakuraBackground';

const HeroSection = memo(() => {
  // Theme-aware colors
  const colorCombinations = useColorCombinations();
  const commonColors = useCommonColors();

  return (
    <SakuraBackground intensity="moderate" variant="falling">
      <Box
        id="hero"
        role="banner"
        aria-label="Hero section with introduction"
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
                  color: commonColors.textSecondary,
                }}
                role="text"
                aria-label="Professional summary and qualifications"
              >
                2025 M.S. Computer Science Graduate | 2 Years of Series B Fintech Startup Experience
              </Text>
            </ParallaxElement>
            <ParallaxElement speed={-0.8} center={true}>
              <Group justify="center" gap="md" role="group" aria-label="Navigation actions">
                <Button
                  size="lg"
                  color="sakura"
                  aria-label="View my work projects and portfolio"
                  role="button"
                  tabIndex={0}
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
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  View My Work
                </Button>
                <Button
                  size="lg"
                  variant="filled"
                  color="sakura"
                  aria-label="Contact me for job opportunities and collaboration"
                  role="button"
                  tabIndex={0}
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
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }
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
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
