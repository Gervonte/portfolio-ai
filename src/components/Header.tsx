'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Group,
  Stack,
  Burger,
  Paper,
  Transition,
  Text,
  Button,
  Box,
  Anchor,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCode, IconHeart } from '@tabler/icons-react';
import { commonColors, colorCombinations, sakura } from '@/lib/colors';

const HEADER_HEIGHT = 60;

interface HeaderProps {
  links: Array<{ link: string; label: string }>;
}

export default function Header({ links }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = links.map(link => (
    <Anchor
      key={link.label}
      href={link.link}
      size="sm"
      aria-label={`Navigate to ${link.label} section`}
      style={{
        textDecoration: 'none',
        color: scrolled ? commonColors.textPrimary : commonColors.textInverse,
        fontWeight: 500,
        transition: 'color 0.3s ease',
        position: 'relative',
      }}
      onClick={e => {
        e.preventDefault();
        const element = document.querySelector(link.link);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        close();
      }}
    >
      {link.label}
    </Anchor>
  ));

  return (
    <Box
      component="header"
      role="banner"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(254, 254, 254, 0.95)' : 'rgba(254, 254, 254, 0.1)',
        borderBottom: scrolled ? '1px solid rgba(248, 187, 217, 0.2)' : 'none',
      }}
    >
      <Container size="lg" style={{ height: HEADER_HEIGHT }}>
        <Group justify="space-between" h="100%">
          {/* Logo */}
          <Group gap="xs">
            <IconCode
              size={28}
              aria-hidden="true"
              style={{
                color: scrolled ? commonColors.accentPrimary : commonColors.accentSecondary,
                transition: 'color 0.3s ease',
              }}
            />
            <Text
              size="lg"
              fw={700}
              style={{
                backgroundImage: scrolled
                  ? colorCombinations.sakuraGradient
                  : `linear-gradient(135deg, ${commonColors.accentSecondary}, ${sakura[0]})`,
                backgroundSize: '100% 100%',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              Gervonte&apos;s Portfolio
            </Text>
          </Group>

          {/* Desktop Navigation */}
          <Group gap="xl" visibleFrom="sm" role="navigation" aria-label="Main navigation">
            {items}
            <Button
              size="sm"
              color="sakura"
              variant="outline"
              leftSection={<IconHeart size={16} aria-hidden="true" />}
              aria-label="Connect with me for opportunities"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                borderColor: scrolled ? commonColors.accentPrimary : commonColors.accentSecondary,
                color: scrolled ? commonColors.accentPrimary : commonColors.accentSecondary,
                background: 'transparent',
                transition: 'all 0.3s ease',
              }}
            >
              Let&apos;s Connect
            </Button>
          </Group>

          {/* Mobile Menu Button */}
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            color={scrolled ? commonColors.textPrimary : commonColors.textInverse}
            hiddenFrom="sm"
            aria-label="Toggle mobile menu"
            aria-expanded={opened}
          />
        </Group>
      </Container>

      {/* Mobile Navigation */}
      <Transition transition="pop-top-right" duration={200} mounted={opened}>
        {styles => (
          <Paper
            role="navigation"
            aria-label="Mobile navigation"
            style={{
              ...styles,
              position: 'absolute',
              top: HEADER_HEIGHT,
              left: 0,
              right: 0,
              zIndex: 0,
              background: 'rgba(254, 254, 254, 0.98)',
              backdropFilter: 'blur(10px)',
              borderTop: '1px solid rgba(248, 187, 217, 0.2)',
            }}
            hiddenFrom="sm"
          >
            <Container py="md">
              <Stack gap="md">
                {items}
                <Button
                  fullWidth
                  color="sakura"
                  variant="outline"
                  leftSection={<IconHeart size={16} aria-hidden="true" />}
                  aria-label="Connect with me for opportunities"
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    toggle(); // Close mobile menu
                  }}
                  style={{
                    borderColor: commonColors.accentPrimary,
                    color: commonColors.accentPrimary,
                    background: 'transparent',
                  }}
                >
                  Let&apos;s Connect
                </Button>
              </Stack>
            </Container>
          </Paper>
        )}
      </Transition>
    </Box>
  );
}
